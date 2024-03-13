<?php

namespace Tests\Feature;

use App\Models\EducationalLevel;
use App\Models\Examination;
use App\Models\Notice;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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
        $response = $this->get('/api/notices/id/21');
        $response->assertStatus(200);
    }

    public function test_get_200_code_even_if_doesnt_find_any_notices(): void
    {
        $response = $this->getJson('/api/notices/all');
        $response->assertStatus(200);
    }
}
