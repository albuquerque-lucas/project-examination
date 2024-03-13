<?php

namespace Tests\Feature;

use App\Http\Controllers\NoticeController;
use App\Models\EducationalLevel;
use App\Models\Examination;
use App\Models\Notice;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Mockery\MockInterface;
use Tests\TestCase;

class NoticeRoutesGeneralTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_get_200_code_when_requests_for_all_notices(): void
    {
        EducationalLevel::factory()->create();
        Examination::factory()->count(5)->create([
            'educational_level_id' => 1,
        ]);
        Notice::factory()->count(5)->create([
            'examination_id' => 1,
        ]);
        $response = $this->get('/api/notices/all');
        $response->assertStatus(200);
        $response->json();
        $response->assertJsonCount(5, 'data');
    }

    public function test_get_200_code_when_requests_for_id_notice(): void
    {
        EducationalLevel::factory()->create();
        Examination::factory(2)->create([
            'educational_level_id' => 1,
        ]);
        Notice::factory()->create([
            'examination_id' => 1,
        ]);
        Notice::factory()->create([
            'examination_id' => 2,
        ]);
        $response = $this->get('/api/notices/id/26');
        $response->assertStatus(200);
    }

    public function test_get_200_code_even_if_doesnt_find_any_notices(): void
    {
        $response = $this->getJson('/api/notices/all');
        $response->assertStatus(200);
    }

    public function test_get_204_no_content_if_get_for_inexistent_id():void
    {
        Notice::factory()->create([
            'examination_id' => 1,
        ]);

        $response = $this->get("/api/examinations/id/400");
        $response->assertStatus(204);
    }

    public function test_get_400_if_invalid_order_parameter():void
    {
        Notice::factory()->create([
            'examination_id' => 1,
        ]);

        $response = $this->getJson("/api/notices/all?order=qwerty");
        $response->assertStatus(400)->assertJson(        [
            "message"=> "The selected order is invalid.",
            "code"=> 0
        ]);
    }
}
