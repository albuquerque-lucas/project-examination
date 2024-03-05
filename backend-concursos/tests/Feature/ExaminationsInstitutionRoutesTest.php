<?php

namespace Tests\Feature;

use App\Models\EducationalLevel;
use Tests\TestCase;
use App\Models\Examination;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ExaminationsInstitutionRoutesTest extends TestCase
{
    use RefreshDatabase;
    public function test_get_200_code_examinations_by_institution():void
    {
        $educationalLevel2 = EducationalLevel::factory()->create([
            'id' => 2,
            'name' => 'Tecnico'
        ]);

        $educationalLevel4 = EducationalLevel::factory()->create([
            'id' => 4,
            'name' => 'Pos-Graduacao'
        ]);
        $exampleExamination = Examination::factory()->create([
            'institution' => 'Example Institution Test',
            'educational_level_id' => $educationalLevel4->id,
        ]);

        Examination::factory(29)->create([
            'educational_level_id' => $educationalLevel2->id,
        ]);

        $response = $this->get('/api/examinations/institution', ['institution' => 'Test']);
        $data = $response->json();
        $response->assertStatus(200);
        $response->assertJsonStructure(['data']);
        $result = $data['data'];
        $this->assertCount(1, $result);
        $this->assertEquals($exampleExamination->id, $result[0]['id']);
        $this->assertEquals($exampleExamination->institution, $result[0]['institution']);
    }

    public function test_get_204_no_content_if_gets_for_inexistent_institution(): void
    {
        $educationalLevel4 = EducationalLevel::factory()->create([
            'id' => 4,
            'name' => 'Pos-Graduacao'
        ]);
        $defaultExaminations = Examination::factory(4)->create([
            'institution' => 'Institution de teste',
            'educational_level_id' => $educationalLevel4->id,
        ]);

        $response = $this->get("/api/examinations/institution", ['institution' => 'Inexistent']);
        $response->assertStatus(204);
    }

    public function test_get_400_error_if_missing_institution_parameter(): void
    {
        $educationalLevel4 = EducationalLevel::factory()->create([
            'id' => 4,
            'name' => 'Pos-Graduacao'
        ]);
        $defaultExaminations = Examination::factory(4)->create([
            'institution' => 'Institution de teste',
            'educational_level_id' => $educationalLevel4->id,
        ]);

        $response = $this->get("/api/examinations/institution");
        $response->assertStatus(400)->assertJson([
            "message"=> "O parâmetro Instituição é obrigatório.",
            "code"=> 400
        ]);
    }
}
