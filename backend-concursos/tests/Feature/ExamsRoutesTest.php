<?php

namespace Tests\Feature;

use App\Models\ServiceResponse;
use Database\Seeders\ExaminationSeeder;
use Database\Seeders\ExamsSeeder;
use Database\Seeders\EducationalLevelsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExamsRoutesTest extends TestCase
{

    use RefreshDatabase;

    public function test_post_201_user_can_create_new_exam(): void
    {
        $response = new ServiceResponse();
        $this->postJson('api/exams/create', [
            'examination_id' => 1,
            'title' => 'Exame de Matemática',
            'date' => '2021-12-12',
            'start_time' => '08:00:00',
            'end_time' => '12:00:00',
        ])
        ->assertStatus(201)
        ->assertJson([
            'message' => $response->createdSuccessfully('Exam'),
            'id' => 1,
        ]);
    }

    public function test_post_422_for_missing_examination_id(): void
    {
        $this->postJson('api/exams/create', [
            'title' => 'Exame de Matemática',
            'date' => '2021-12-12',
            'start_time' => '08:00:00',
            'end_time' => '12:00:00',
        ])
        ->assertStatus(422)
        ->assertJson([
            'message' => 'The examination id field is required.',
            'errors' => [
                'examination_id' => [
                    'The examination id field is required.'
                ]
            ],
        ]);
    }

    public function test_post_422_for_missing_title(): void
    {
        $this->postJson('api/exams/create', [
            'examination_id' => 1,
            'date' => '2021-12-12',
            'start_time' => '08:00:00',
            'end_time' => '12:00:00',
        ])
        ->assertStatus(422)
        ->assertJson([
            'message' => 'The title field is required.',
            'errors' => [
                'title' => [
                    'The title field is required.'
                ]
            ],
        ]);
    }

    public function test_get_200_when_gets_for_all_exams():void
    {
        $this->seed_on();
        $this->getJson('api/exams/all')
            ->assertStatus(200)
            ->assertJsonCount(15, 'data');
    }

    public function test_get_200_when_gets_for_all_exams_even_if_theres_no_exams_on_record():void
    {
        $this->getJson('api/exams/all')
            ->assertStatus(200)
            ->assertJsonCount(0, 'data');
    }

    public function test_get_200_when_gets_exams_by_id():void
    {
        $this->seed_on();
        $this->getJson('api/exams/id/152')
            ->assertStatus(200)
            ->assertJsonStructure([
                'id',
                'title',
                'examination',
                'description',
                'date',
                'start_time',
                'end_time',
            ]);
    }

    public function test_get_204_when_requests_for_inexistent_exam_id():void
    {
        $this->getJson('api/exams/id/400')
            ->assertStatus(204);
    }

    public function test_delete_200_when_delete_existent_exam():void
    {
        $response = new ServiceResponse();
        $this->seed_on();
        $this->deleteJson('api/exams/delete/232')
            ->assertStatus(200)
            ->assertJson([
                'message' => $response->deletedSuccessfully('Exam'),
                'deleted' => true,
            ]);
    }

    public function test_delete_404_when_tries_to_delete_inexistent_exam(): void
    {
        $response = new ServiceResponse();
        $this->deleteJson('api/exams/delete/400')
            ->assertStatus(404)
            ->assertJson([
                'message' => $response->recordsNotFound('Exam'),
                'info' => 'No query results for model [App\Models\Exam] 400',
                'deleted' => false,
            ]);
    }

    public function test_patch_200_when_updates_existent_exam(): void
    {
        $response = new ServiceResponse();
        $request_data = ['title' => 'Nuevo'];
        $this->seed_on();
        $this->patchJson('api/exams/update/312', $request_data)
        ->assertStatus(200)
        ->assertJson([
            'message' => $response->changesSaved(),
        ]);
    
    }

    public function test_patch_200_when_there_are_no_changes_to_be_made(): void
    {
        $response = new ServiceResponse();
        $request_data = ['title' => 'Nuevo'];
        $this->seed_on();
        $this->patchJson('api/exams/update/394', $request_data)
        ->assertStatus(200)
        ->assertJson([
            'message' => $response->changesSaved(),
        ]);

        $this->patchJson('api/exams/update/394', $request_data)
        ->assertStatus(200)
        ->assertJson([
            'message' => $response->noChangesToBeMade(),
        ]);
    }

    public function test_patch_404_when_tries_to_update_inexistent_exam(): void
    {
        $response = new ServiceResponse();
        $request_data = ['title' => 'Nuevo'];
        $this->patchJson('api/exams/update/400', $request_data)
        ->assertStatus(404)
        ->assertJson([
            'message' => $response->recordsNotFound('Exam'),
        ]);
    }

    private function seed_on()
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);
        $this->seed(ExamsSeeder::class);
    }
}
