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

        $response = $this->postJson('api/create/examination', $requestData);
        $response->assertStatus(201)->assertJson($responseData);
    }

    public function test_gets_422_error_for_missing_institution_parameter_to_create_examination(): void
    {
        $requestData = [
            'educational_level_id' => 4,
            'title' => 'Concurso de Teste 01',
        ];

        $response = $this->postJson('api/create/examination', $requestData);
        $response->assertStatus(422);
        $data = $response->json();
        $expectedMessage = "É necessário informar uma instituição.";
        $this->assertEquals($expectedMessage, $data['message']);

    }

    public function test_gets_422_error_for_missing_title_parameter_to_create_examination(): void
    {
        $requestData = [
            'educational_level_id' => 4,
            'institution' => 'Institution de teste 01',
        ];

        $response = $this->postJson('api/create/examination', $requestData);
        $response->assertStatus(422);
        $data = $response->json();
        $expectedMessage = "É necessário informar um título.";
        $this->assertEquals($expectedMessage, $data['message']);

    }

    public function test_gets_422_error_for_missing_educational_level_parameter_to_create_examination(): void
    {
        $requestData = [
            'title' => 'Concurso de Teste 01',
            'institution' => 'Institution de teste 01',
        ];

        $response = $this->postJson('api/create/examination', $requestData);
        $response->assertStatus(422);

        $data = $response->json();
        $expectedMessage = "O nivel de escolaridade do concurso é obrigatório. Nenhum foi informado.";
        $this->assertEquals($expectedMessage, $data['message']);
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
        $expectedMessage = "Não foi encontrado nenhum objeto com este id.";
        $this->assertEquals($expectedMessage, $data['message']);
    }

    public function test_get_examinations_by_registration_date():void
    {
        $testStartDate = '2025-02-01';
        $testEndDate = '2025-03-21';

        Examination::factory(5)->create([
            'educational_level_id' => 4,
        ]);

        $examinationTest = Examination::factory()->create([
            'educational_level_id' => 4,
            'registration_start_date' => $testStartDate,
            'registration_end_date' =>  $testEndDate,
        ]);

        $response = $this->getJson("/api/examinations/registrationDate", ['registrationDate' => $testStartDate]);
        $response->assertStatus(200);
        $result = $response->json();
        $data = $result['data'];
        $formattedDate = $examinationTest->registration_start_date->format('Y-m-d');

        $this->assertCount(1, $data);
        $this->assertEquals($examinationTest->title, $data[0]['title']);
        $this->assertEquals($examinationTest->institution, $data[0]['institution']);
        $this->assertEquals($formattedDate, $data[0]['registration_start_date']);

    }
}
