<?php

namespace Tests\Feature;

use App\Models\Examination;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ExaminationTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_post_201_user_can_create_an_examination_register(): void
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
            'message' => 'Concurso adicionado com sucesso.',
            'id' => 1,
            'title' => 'Concurso de Teste 01',
        ];

        $response = $this->postJson('api/create/examination', $requestData);
        $response->assertStatus(201)->assertJson($responseData);
    }

    public function test_get_422_error_if_tries_to_register_examination_with_invalid_date_format():void
    {
        $requestData = [
            'educational_level_id' => 4,
            'title' => 'Concurso de Teste 01',
            'active' => true,
            'institution' => 'Instituicao do teste 01',
            'registration_start_date' => '2025',
            'registration_end_date' => '2025',
            'exams_start_date' => '25-04-14',
            'exams_end_date' => '25-04-21',
        ];

        $response = $this->postJson('api/create/examination', $requestData);
        $response->assertStatus(422)->assertJson([
            "message" => "Data inválida. Use o formato YYYY-MM-DD.",
        ]);
    }

    public function test_get_422_error_for_missing_institution_parameter_to_create_examination(): void
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

    public function test_get_422_error_for_missing_title_parameter_to_create_examination(): void
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

    public function test_get_422_error_for_missing_educational_level_parameter_to_create_examination(): void
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

    public function test_get_200_code_all_examinations_page_1(): void
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

    public function test_get_200_code_examinations_by_id(): void
    {
        $examination = Examination::factory()->create([
            'educational_level_id' => 4,
        ]);
        $response = $this->get("/api/examinations/examination-id?id=$examination->id");
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

    public function test_get_200_code_examinations_by_date():void
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

        $response = $this->getJson("/api/examinations/registration-date", ['registrationDate' => $testStartDate]);
        $response->assertStatus(200);
        $result = $response->json();
        $data = $result['data'];
        $formattedDate = $examinationTest->registration_start_date->format('Y-m-d');

        $this->assertCount(1, $data);
        $this->assertEquals($examinationTest->title, $data[0]['title']);
        $this->assertEquals($examinationTest->institution, $data[0]['institution']);
        $this->assertEquals($formattedDate, $data[0]['registration_start_date']);

    }

    public function test_get_404_error_and_a_message_if_get_for_inexistent_id():void
    {
        Examination::factory()->create([
            'educational_level_id' => 4,
        ]);
        $response = $this->get("/api/examinations/examination-id?id=400");
        $response->assertStatus(404);
        
        $response->assertJsonStructure([
            "message"
        ]);
        
        $data = $response->json();
        $expectedMessage = "Não foi encontrado nenhum objeto com este id.";
        $this->assertEquals($expectedMessage, $data['message']);
    }

    public function test_get_404_error_and_a_message_if_gets_for_inexistent_title(): void
    {
        $defaultExaminations = Examination::factory(4)->create([
            'title' => 'Titulos de teste',
            'educational_level_id' => 4,
        ]);

        $response = $this->get("/api/examinations/title", ['title' => 'Titulo inexistente.']);
        $data = $response->json();
        $response->assertStatus(404);
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

    public function test_get_400_if_date_is_in_invalid_format():void
    {
        $exampleRegistrationStartDate = '2024-04-04';

        Examination::factory(5)->create([
            'educational_level_id' => 4,
        ]);

        $examinationTest = Examination::factory()->create([
            'educational_level_id' => 4,
            'title' => 'Concurso para buscar por data',
            'institution' => 'Instituicao teste registration date',
            'registration_start_date' => $exampleRegistrationStartDate,
            'registration_end_date' =>  '2024-04-24',
        ]);
        $response = $this->getJson("/api/examinations/registration-date", ['registrationDate' => 25]);

        $response->assertStatus(400)->assertJson(        [
            "message" => "Data informada no formato inválido. Utilize YYYY-MM-DD.",
            "code" => 400
        ]);
    }

    public function test_get_400_if_registration_date_is_missing(): void
    {
        $exampleRegistrationStartDate = '2024-04-04';

        Examination::factory(5)->create([
            'educational_level_id' => 4,
        ]);

        $examinationTest = Examination::factory()->create([
            'educational_level_id' => 4,
            'title' => 'Concurso para buscar por data',
            'institution' => 'Instituicao teste registration date',
            'registration_start_date' => $exampleRegistrationStartDate,
            'registration_end_date' =>  '2024-04-24',
        ]);
        $response = $this->getJson("/api/examinations/registration-date");
        $result = $response->json();
        $response->assertStatus(400)->assertJson($result);
    }

    public function test_get_400_if_invalid_order_parameter():void
    {
        Examination::factory(5)->create([
            'title' => 'teste',
            'educational_level_id' => 4,
        ]);

        $response = $this->getJson("/api/examinations/title?order=qwerty", ['title' => 'wer']);
        $response->assertStatus(400)->assertJson(        [
            "message"=> "Parâmetro de ordenação inválido. Use \"asc\" ou \"desc\".",
            "code"=> 400
        ]);
    }

    public function testes_get_400_if_invalid_or_missing_id_parameter(): void
    {
        $response = $this->getJson("/api/examinations/examination-id?id=");
        $response->assertStatus(400)->assertJson([
            "message"=> "Missing required parameter: id",
            "code"=> 400
        ]);
    }
}
