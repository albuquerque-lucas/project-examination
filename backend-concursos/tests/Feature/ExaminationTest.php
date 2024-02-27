<?php

namespace Tests\Feature;

use App\Models\Examination;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\TestResponse;
use SebastianBergmann\Type\VoidType;
use Tests\TestCase;

class ExaminationTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_user_can_create_an_examination_register(): void
    {
        $requestData = [
            'educational_level_id' => 4,
            'title' => 'Concurso de Teste 01',
            'active' => true,
            'institution' => 'Instituicao do teste 01',
            'registration_start_date' => '25-02-15',
            'registration_end_date' => '25-03-16',
            'exams_start_date' => '25-04-14',
            'exams_end_date' => '25-04-21',
        ];

        $responseData = [
            'id' => 1,
            'educational_level_id' => 4,
            'title' => 'Concurso de Teste 01',
            'active' => 1,
            'institution' => 'Instituicao do teste 01',
            'registration_start_date' => '2025-02-15',
            'registration_end_date' => '2025-03-16',
            'exams_start_date' => '2025-04-14',
            'exams_end_date' => '2025-04-21',
        ];

        $response = $this->post('api/create/examination', $requestData);
        $response->assertStatus(201)->assertJson($responseData);
    }

    public function test_get_all_examinations_page_1(): void
    {
        Examination::factory(20)->create([
            'educational_level_id' => 4,
        ]);
        $response = $this->getJson('/api/examinations/all');
        $response->assertStatus(200);
        $response->assertJsonStructure(['data']);
        $data = $response->json();
        $result = $data['data'];
        $this->assertIsArray($result);
        $this->assertCount(15, $result);
    }

    public function test_get_examinations_by_title(): void
    {
        $exampleExamination1 = Examination::factory()->create([
            'title' => 'Examination Test Example One',
            'educational_level_id' => 4,
        ]);

        $exampleExamination2 = Examination::factory()->create([
            'title' => 'Examination Test Example Two',
            'educational_level_id' => 4,
        ]);

        $exampleExamination3 = Examination::factory()->create([
            'title' => 'Examination Test Example One Two',
            'educational_level_id' => 4,
        ]);

        $examinationList = Examination::factory(2)->create([
            'educational_level_id' => 2,
        ]);

        $response = $this->getJson('/api/examinations/title', ['title' => 'One']);
        $response->assertStatus(200);
        $response->assertJsonStructure(['data']);
        $data = $response->json();
        $result = $data['data'];
        $this->assertCount(2, $result);
        $this->assertEquals($exampleExamination1->id, $result[1]['id']);
        $this->assertEquals($exampleExamination3->title, $result[0]['title']);
    }

    public function test_get_examinations_by_institution():void
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

    public function test_get_examinations_by_id(): void
    {
        $examination = Examination::factory()->create([
            'educational_level_id' => 4,
        ]);
        $response = $this->get("/api/examinations/$examination->id");
        $response->assertStatus(200);
        
        $response->assertJsonStructure([
            "id",
            "educational_level_id",
            "title",
            "active",
            "institution",
            "registration_start_date",
            "registration_end_date",
            "exams_start_date",
            "exams_end_date",
            "created_at",
            "updated_at"
        ]);
        
        $data = $response->json();
        $this->assertEquals($examination->id, $data['id']);
    }

    public function test_gets_404_error_and_message_if_gets_for_inexistent_id():void
    {
        Examination::factory()->create([
            'educational_level_id' => 4,
        ]);
        $response = $this->get("/api/examinations/400");
        $response->assertStatus(404);
        
        $response->assertJsonStructure([
            "message"
        ]);
        
        $data = $response->json();
        $expectedMessate = "Não foi encontrado nenhum objeto com este id.";
        $this->assertEquals($expectedMessate, $data['message']);
    }
}
