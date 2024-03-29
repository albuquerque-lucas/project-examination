<?php

namespace Tests\Feature;

use App\Http\Controllers\NoticeController;
use App\Models\EducationalLevel;
use App\Models\Examination;
use App\Models\Notice;
use Database\Seeders\EducationalLevelsSeeder;
use Database\Seeders\ExaminationSeeder;
use Database\Seeders\NoticesSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Mockery\MockInterface;
use Tests\TestCase;

class NoticeRoutesGeneralTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_200_code_when_requests_for_all_notices(): void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);
        $this->seed(NoticesSeeder::class);

        $this->get('/api/notices/all')
            ->assertStatus(200)
            ->assertJsonCount(15, 'data');
    }

    public function test_get_200_code_when_requests_notice_for_id(): void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);
        $this->seed(NoticesSeeder::class);

        $this->get('/api/notices/id/41')
            ->assertStatus(200)
            ->assertJsonStructure([
                'id',
                'file_path',
                'file_name',
                'publication_date',
            ]);
    }

    public function test_get_200_code_even_if_doesnt_find_any_notices(): void
    {
        $this->getJson('/api/notices/all')->assertStatus(200);
    }

    public function test_get_204_no_content_if_get_for_inexistent_notice_id():void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);
        $this->seed(NoticesSeeder::class);

        $this->get("/api/notices/id/400")->assertStatus(204);
    }

    public function test_get_400_if_invalid_order_parameter():void
    {
        $this->getJson("/api/notices/all?order=qwerty")
            ->assertStatus(400)
            ->assertJson([
                "message"=> "The selected order is invalid.",
                "code"=> 0
            ]);
    }

    public function test_post_201_user_can_create_a_notice_register(): void
    {
        $requestData = [
            'examination_id' => 1,
            'file' => 'file_path/no-file.pdf',
            'file_name' => 'no_file_at_all.pdf',
            'publication_date' => '2024-03-06',
        ];

        $responseData = [
            'message' => 'Notice created successfully.',
            'id' => 82,
            'file_name' => $requestData['file_name'],
            'file_path' => $requestData['file'],
        ];

        $this->postJson('api/notices/create', $requestData)
            ->assertStatus(201)
            ->assertJson($responseData);
    }

    public function test_post_422_for_missing_file_info_on_notice_creation(): void
    {
        $requestData = [
            'examination_id' => 1,
            'publication_date' => '2024-03-06',
        ];

        $responseData = [
            'message' => 'Missing file information. Please provide a file path.',
        ];

        $this->postJson('api/notices/create', $requestData)
            ->assertStatus(422)
            ->assertJson($responseData);
    }

    public function test_post_422_for_missing_examination_id_info_on_notice_creation(): void
    {
        $requestData = [
            "file" => "file_path/no-file.pdf",
            'publication_date' => '2024-03-06',
        ];

        $responseData = [
            'message' => 'Missing examination ID. Please provide an ID for the associated notice.',
        ];

        $this->postJson('api/notices/create', $requestData)
            ->assertStatus(422)
            ->assertJson($responseData);
    }
}
