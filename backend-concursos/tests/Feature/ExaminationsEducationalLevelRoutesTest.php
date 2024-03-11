<?php

namespace Tests\Feature;

use App\Models\EducationalLevel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Examination;

class ExaminationsEducationalLevelRoutesTest extends TestCase
{
    use RefreshDatabase;
    public function test_get_200_code_examinations_by_educational_level(): void
    {
        $educationalLevel = EducationalLevel::factory()->create([
            'id' => 4,
            'name' => 'Graduacao'
        ]);
        $exampleExaminatiosList1 = Examination::factory(10)->create([
            'educational_level_id' => $educationalLevel->id
        ]);

        $exampleExaminatiosList2 = Examination::factory(10)->create([
            'educational_level_id' => 2
        ]);


        $exampleExaminatiosList3 = Examination::factory(10)->create([
            'educational_level_id' => 3
        ]);


        $response = $this->getJson('/api/examinations/educational-level/4');
        $response->assertStatus(200);
    }

    public function test_get_404_if_cant_find_examinations_with_given_educational_level_id(): void
    {
        $exampleExaminatiosList1 = Examination::factory(10)->create([
            'educational_level_id' => 4
        ]);

        $response = $this->getJson('/api/examinations/educational-level/1231231');
        $response->assertStatus(204);
    }
}
