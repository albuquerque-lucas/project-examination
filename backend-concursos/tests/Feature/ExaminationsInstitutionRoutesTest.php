<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Examination;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ExaminationsInstitutionRoutesTest extends TestCase
{
    use RefreshDatabase;
    public function test_get_200_code_examinations_by_institution():void
    {
        $exampleExamination = Examination::factory()->create([
            'institution' => 'Example Institution Test',
            'educational_level_id' => 4,
        ]);

        Examination::factory(29)->create([
            'educational_level_id' => 2,
        ]);

        $response = $this->getJson('/api/examinations/institution', ['institution' => 'Test']);
        $response->assertStatus(200);
        $response->assertJsonStructure(['data']);
        $data = $response->json();
        $result = $data['data'];
        $this->assertCount(1, $result);
        $this->assertEquals($exampleExamination->id, $result[0]['id']);
        $this->assertEquals($exampleExamination->institution, $result[0]['institution']);
    }

    public function test_get_404_error_and_a_message_if_gets_for_inexistent_institution(): void
    {
        $defaultExaminations = Examination::factory(4)->create([
            'institution' => 'Institution de teste',
            'educational_level_id' => 4,
        ]);

        $response = $this->get("/api/examinations/institution", ['institution' => 'Inexistent']);
        $data = $response->json();
        $response->assertStatus(404);
    }

    public function test_get_400_error_if_missing_institution_parameter(): void
    {
        $defaultExaminations = Examination::factory(4)->create([
            'institution' => 'Institution de teste',
            'educational_level_id' => 4,
        ]);

        $response = $this->get("/api/examinations/institution");
        $response->assertStatus(400)->assertJson([
            "message"=> "E necessario informar a instituicao do concurso.",
            "code"=> 400
        ]);
    }
}
