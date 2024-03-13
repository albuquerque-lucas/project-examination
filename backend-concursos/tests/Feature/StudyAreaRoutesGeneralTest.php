<?php

namespace Tests\Feature;

use App\Models\StudyArea;
use Database\Seeders\StudyAreasSeeder;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class StudyAreaRoutesGeneralTest extends TestCase
{
    use DatabaseTransactions;

    public function test_get_200_code_when_requests_for_all_study_areas(): void
    {
        $this->seed(StudyAreasSeeder::class);
        $this->get('/api/study-areas/all')
            ->assertStatus(200)
            ->assertJsonCount(14, 'data');
    }

    public function test_get_200_code_even_if_doesnt_find_any_notices(): void
    {
        $this->getJson('/api/notices/all')
            ->assertStatus(200)
            ->assertJsonCount(0, 'data');
    }

    public function test_get_200_code_when_requests_for_study_area_id(): void
    {
        $this->seed(StudyAreasSeeder::class);

        $this->get('/api/study-areas/id/20')
            ->assertStatus(200)
            ->assertJson([
                "id" => 20,
                "area" => "Sociologia",
                "subjects" => []
            ]);
    }

    public function test_get_204_no_content_if_get_for_inexistent_study_area_id():void
    {

        $this->get("/api/study-areas/id/400")->assertStatus(204);
    }

    public function test_get_200_code_when_requests_for_area(): void
    {
        $this->seed(StudyAreasSeeder::class);

        $this->get('/api/study-areas/area?area=Sociologia')
            ->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }

    public function test_get_error_code_when_requests_for_area_without_parameter(): void
    {
        $this->seed(StudyAreasSeeder::class);

        $this->get('/api/study-areas/area?area')
            ->assertStatus(400)->assertJson([
            "message" => "The area field is required.",
        ]);
    }

    public function test_get_400_if_invalid_order_parameter():void
    {
        $this->seed(StudyAreasSeeder::class);

        $this->getJson("/api/notices/all?order=qwerty")
            ->assertStatus(400)
            ->assertJson(        [
            "message"=> "The selected order is invalid.",
            "code"=> 0
        ]);
    }

    public function test_post_201_user_can_create_a_study_area_register(): void
    {
        $requestData = [
            'area' => 'Assistencia Publica',
        ];

        $responseData = [
            'message' => 'Área de estudo adicionada com sucesso.',
            'id' => 71,
            'area' => $requestData['area'],
        ];

        $this->postJson('api/study-areas/create', $requestData)
            ->assertStatus(201)
            ->assertJson($responseData);
    }

    public function test_gets_422_code_if_missing_area_field(): void
    {
        $this->postJson('api/study-areas/create', [])
            ->assertStatus(422)
            ->assertJson([
                'message' => 'The area field is required.',
            ]);
    }

    public function test_gets_409_error_when_trying_to_add_with_an_existent_study_area(): void
    {
        $this->seed(StudyAreasSeeder::class);

        $requestData = [
            'area' => 'Sociologia',
        ];

        $this->postJson('api/study-areas/create', $requestData)
            ->assertStatus(409)
            ->assertJson([
                "info" => "Não foi possível criar o registro. Verifique os dados informados.",
            ]);
    }

    public function test_gets_200_when_delete_existent_study_area(): void
    {
        $this->seed(StudyAreasSeeder::class);

        $this->get('api/study-areas/all')
            ->assertStatus(200)
            ->assertJsonCount(14, 'data');

        $this->delete('api/study-areas/delete/100')
            ->assertStatus(200)
            ->assertJson([
                'message' => "Area excluida com sucesso."
            ]);

        $this->get('api/study-areas/all')
            ->assertStatus(200)
            ->assertJsonCount(13, 'data');
    }

    public function test_gets_404_error_when_trying_to_delete_inexistent_study_area(): void
    {
        $this->seed(StudyAreasSeeder::class);

        $this->get('api/study-areas/all')
            ->assertStatus(200)
            ->assertJsonCount(14, 'data');

        $this->delete('api/study-areas/delete/9999')
            ->assertStatus(404)
            ->assertJson([
                'message' => 'Nao foi encontrado nenhum registro com os dados fornecidos.'
            ]);
    }

}
