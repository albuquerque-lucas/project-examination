<?php

namespace Tests\Feature;

use App\Models\EducationalLevel;
use Database\Seeders\ExaminationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Examination;
use Database\Seeders\EducationalLevelsSeeder;

class ExaminationsGeneralRoutesTest extends TestCase
{
    use RefreshDatabase;
    public function test_get_200_code_all_examinations(): void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);
        $this->get('/api/examinations/all')
            ->assertStatus(200)
            ->assertJsonCount(15, 'data');
    }

    public function test_get_200_code_examinations_by_id(): void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);
    
        $this->get("/api/examinations/id/42")
            ->assertStatus(200)
            ->assertJson([
                "id" => 42,
                "title" => "Concurso para Procurador da República",
                "institution" => "Governo Federal",
                "active" => true,
            ]);
    }

    public function test_get_200_code_even_if_doesnt_find_any_examinations(): void
    {
        $this->getJson('/api/examinations/all')->assertStatus(200);
    }

    public function test_get_204_no_content_if_get_for_inexistent_id():void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);

        $this->get("/api/examinations/id/400")->assertStatus(204);
    }

    public function test_get_400_if_invalid_order_parameter():void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);

        $this->getJson("/api/examinations/title?order=qwerty&title=Test")
            ->assertStatus(400)->assertJson([
                "message"=> "The selected order is invalid.",
                "code"=> 400
            ]);
    }

    public function test_get_200_when_successfuly_requests_for_active_or_innactive_examinations(): void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);

        $this->getJson('/api/examinations/activity-status?active=false')
            ->assertStatus(200)
            ->assertJsonCount(0, 'data');

        $this->getJson('/api/examinations/activity-status?active=true')
            ->assertStatus(200)
            ->assertJsonCount(15, 'data');
    }

    public function test_get_200_code_examinations_by_educational_level(): void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);

        $this->getJson('/api/examinations/educational-level/8')
            ->assertStatus(200)
            ->assertJsonStructure(['data']);

    }

    public function test_get_200_even_if_cant_find_examinations_with_given_educational_level_id(): void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);

        $this->getJson('/api/examinations/educational-level/12')->assertStatus(200);
    }


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
            'message' => 'Examination created successfully.',
            'id' => 190,
            'title' => $requestData['title'],
        ];

        $this->postJson('api/create/examination', $requestData)
            ->assertStatus(201)
            ->assertJson($responseData);
    }

    public function test_post_422_error_if_tries_to_register_examination_with_invalid_date_format(): void
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

        $this->postJson('api/create/examination', $requestData)
            ->assertStatus(422)
            ->assertJson([
            "message" => "Data inválida. Use o formato YYYY-MM-DD.",
        ]);
    }

    public function test_post_422_error_for_missing_institution_parameter_to_create_examination(): void
    {
        $requestData = [
            'educational_level_id' => 4,
            'title' => 'Concurso de Teste 01',
        ];

        $this->postJson('api/create/examination', $requestData)
            ->assertStatus(422)
            ->assertJson([
                "message" => "É necessário informar uma instituição.",
            ]);

    }

    public function test_post_422_error_for_missing_title_parameter_to_create_examination(): void
    {
        $requestData = [
            'educational_level_id' => 4,
            'institution' => 'Institution de teste 01',
        ];

        $this->postJson('api/create/examination', $requestData)
            ->assertStatus(422)
            ->assertJson([
                "message" => "É necessário informar um título.",
            ]);

    }

    public function test_post_422_error_for_missing_educational_level_parameter_to_create_examination(): void
    {
        $requestData = [
            'title' => 'Concurso de Teste 01',
            'institution' => 'Institution de teste 01',
        ];

        $this->postJson('api/create/examination', $requestData)
            ->assertStatus(422)
            ->assertJson([
                "message" => "O nivel de escolaridade do concurso é obrigatório. Nenhum foi informado.",
            ]);
    }
}
