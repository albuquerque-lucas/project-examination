<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Examination;

class ExaminationsActiveRoutesTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_gets_200_when_successful_request(): void
    {
        Examination::factory(5)->create([
            'educational_level_id' => 4,
            'active' => false,
        ]);
        Examination::factory(4)->create([
            'educational_level_id' => 4,
            'active' => true,
        ]);
        $response = $this->withHeaders([
            'active' => true,
        ])->getJson('/api/examinations/activity-status');
        $data = $response->json();
        $response->assertStatus(200)->assertJsonCount(13);
        $this->assertCount(4, $data['data']);
    }

    public function test_gets_404_when_no_active_header_param(): void
    {
        $response = $this->getJson('/api/examinations/activity-status');
        $response->assertStatus(404)->assertJson([
            "message"=> "Não foram encontrados registros com os dados fornecidos.",
            "code"=> 404
        ]);
    }
}
