<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Examination;

class ExaminationsTitleRoutesTest extends TestCase
{
    use RefreshDatabase;
    public function test_get_200_code_examinations_by_title(): void
    {
        $exampleExamination1 = Examination::factory()->create([
            'title' => 'Examination Test Example Raziel',
            'educational_level_id' => 4,
        ]);

        $exampleExamination2 = Examination::factory()->create([
            'title' => 'Examination Test Example Two',
            'educational_level_id' => 4,
        ]);

        $exampleExamination3 = Examination::factory()->create([
            'title' => 'Examination Test Example Raziel Two',
            'educational_level_id' => 4,
        ]);

        $examinationList = Examination::factory(2)->create([
            'educational_level_id' => 2,
        ]);

        $response = $this->getJson('/api/examinations/title', ['title' => 'Raziel']);
        $response->assertStatus(200);
        $result = $response->json();
        $data = $result['original']['data'];
        $response->assertJsonStructure(['original']);
        $this->assertCount(2, $data);
        $this->assertEquals($exampleExamination1->id, $data[1]['id']);
        $this->assertEquals($exampleExamination3->title, $data[0]['title']);
    }
    public function test_get_404_error_and_a_message_if_gets_for_inexistent_title(): void
    {
        $defaultExaminations = Examination::factory(4)->create([
            'title' => 'Titulos de teste',
            'educational_level_id' => 4,
        ]);

        $response = $this->get("/api/examinations/title", ['title' => 'Titulo inexistente.']);
        $response->assertStatus(404)->assertJson([
            "message"=> "Nao foram encontrados registros com o titulo informado.",
            "code"=> 404
        ]);
    }

    public function test_get_400_error_if_missing_title_parameter(): void
    {
        $defaultExaminations = Examination::factory(4)->create([
            'title' => 'Title de teste',
            'educational_level_id' => 4,
        ]);

        $response = $this->get("/api/examinations/title");
        $response->assertStatus(400)->assertJson([
            "message"=> "E necessario informar o titulo do concurso.",
            "code"=> 400
        ]);
    }

}
