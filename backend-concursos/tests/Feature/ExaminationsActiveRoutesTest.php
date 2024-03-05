<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Examination;
use App\Models\EducationalLevel;

class ExaminationsActiveRoutesTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_gets_200_when_successful_request(): void
    {
        $educationalLevelActive = EducationalLevel::factory(3)->create(['name' => 'Tecnico']);
        $educationalLevelInactive = EducationalLevel::factory()->create(['name' => 'Graduacao', 'id' => 4]);
        $innactive = Examination::factory(5)->create([
            'educational_level_id' => $educationalLevelInactive->id,
            'active' => false,
        ]);
        $active = Examination::factory(4)->create([
            'educational_level_id' => 4,
            'active' => true,
        ]);

        $exampleInactive = Examination::factory()->create([
            'educational_level_id' => $educationalLevelInactive->id,
            'active' => false,
        ]);
        $response = $this->getJson('/api/examinations/activity-status');
        $response->assertStatus(200);
        // $this->assertCount(4, $data['data']);
    }
}
