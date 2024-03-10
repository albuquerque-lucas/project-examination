<?php

namespace Tests\Feature;

use App\Models\Examination;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ExaminationsCreationTest extends TestCase
{
    use RefreshDatabase;
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
        
        // $examination = Examination::factory()->create($requestData);
        $responseData = [
            'message' => 'Concurso adicionado com sucesso.',
            'id' => 37,
            'title' => $requestData['title'],
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
}
