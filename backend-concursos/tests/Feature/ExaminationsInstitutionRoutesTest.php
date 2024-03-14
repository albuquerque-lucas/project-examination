<?php

namespace Tests\Feature;

use App\Models\EducationalLevel;
use Database\Seeders\EducationalLevelsSeeder;
use Database\Seeders\ExaminationSeeder;
use Tests\TestCase;
use App\Models\Examination;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ExaminationsInstitutionRoutesTest extends TestCase
{
    use RefreshDatabase;
    public function test_get_200_code_examinations_by_institution():void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);

        $this->getJson('/api/examinations/institution?institution=Gov')
            ->assertStatus(200)
            ->assertJsonStructure(['data']);
    }

    public function test_get_200_even_if_no_content_when_it_gets_for_inexistent_institution(): void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);

        $this->get("/api/examinations/institution?institution=inexistent")
            ->assertStatus(200);
    }

    public function test_get_400_error_if_missing_institution_parameter(): void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);

        $this->get("/api/examinations/institution")
            ->assertStatus(400)
            ->assertJson([
                "message"=> "The institution field is required.",
                "code"=> 0
            ]);
    }
}
