<?php

namespace Tests\Feature;

use Database\Seeders\ExaminationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
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

        $this->postJson('api/examinations/create', $requestData)
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

        $this->postJson('api/examinations/create', $requestData)
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

        $this->postJson('api/examinations/create', $requestData)
            ->assertStatus(422)
            ->assertJson([
                "message" => "The institution field is required.",
            ]);

    }

    public function test_post_422_error_for_missing_title_parameter_to_create_examination(): void
    {
        $requestData = [
            'educational_level_id' => 4,
            'institution' => 'Institution de teste 01',
        ];

        $this->postJson('api/examinations/create', $requestData)
            ->assertStatus(422)
            ->assertJson([
                "message" => "The title field is required.",
            ]);

    }

    public function test_post_422_error_for_missing_educational_level_parameter_to_create_examination(): void
    {
        $requestData = [
            'title' => 'Concurso de Teste 01',
            'institution' => 'Institution de teste 01',
        ];

        $this->postJson('api/examinations/create', $requestData)
            ->assertStatus(422)
            ->assertJson([
                "message" => "The educational level id field is required.",
            ]);
    }

    public function test_post_409_error_when_tries_to_create_an_examination_with_pre_existent_data(): void
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

        $this->postJson('api/examinations/create', $requestData);
        $this->postJson('api/examinations/create', $requestData)
            ->assertStatus(409)
            ->assertJson([
                "message" => "Failed to create record. Please check the submitted data.",
            ]);
    }

    public function test_patch_200_error_when_updates_examination_successfully(): void
    {
        $postData = [
            'educational_level_id' => 4,
            'title' => 'Concurso de Teste 01',
            'active' => true,
            'institution' => 'Instituicao do teste 01',
            'registration_start_date' => '25-02-15',
            'registration_end_date' => '25-03-16',
            'exams_start_date' => '25-04-14',
            'exams_end_date' => '25-04-21',
        ];

        $updateData = [
            'title' => 'Concurso de Teste 02',
        ];

        $this->postJson('api/examinations/create', $postData);
        $this->patchJson('api/examinations/update/193', $updateData)
            ->assertJson([
                "message" => "Changes saved successfully.",
                "id" => 193,
            ]);
    }

    public function test_patch_409_error_when_tries_to_update_examination_with_pre_existent_data(): void
    {
        $postData1 = [
            'educational_level_id' => 4,
            'title' => 'Concurso de Teste 01',
            'active' => true,
            'institution' => 'Instituicao do teste 01',
            'registration_start_date' => '25-02-15',
            'registration_end_date' => '25-03-16',
            'exams_start_date' => '25-04-14',
            'exams_end_date' => '25-04-21',
        ];

        $postData2 = [
            'educational_level_id' => 4,
            'title' => 'Concurso de Teste 02',
            'active' => true,
            'institution' => 'Instituicao do teste 02',
            'registration_start_date' => '25-02-15',
            'registration_end_date' => '25-03-16',
            'exams_start_date' => '25-04-14',
            'exams_end_date' => '25-04-21',
        ];

        $updateData = [
            'title' => 'Concurso de Teste 02',
        ];

        $this->postJson('api/examinations/create', $postData1);
        $this->postJson('api/examinations/create', $postData2);
        $this->patchJson('api/examinations/update/194', $updateData)
            ->assertJson([
                "message" => "Failed to change record. Please check the submitted data.",
            ]);
    }
}
