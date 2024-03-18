<?php

namespace Tests\Feature;

use Database\Seeders\EducationalLevelsSeeder;
use Database\Seeders\ExaminationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExaminationsTitleRoutesTest extends TestCase
{
    use RefreshDatabase;
    public function test_get_200_code_examinations_by_title(): void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);

        $this->getJson('/api/examinations/title?title=Tribunal')
            ->assertStatus(200)
            ->assertJson([
                'prev_page_url' => NULL,
                'to' => 1,
                'total' => 1,
                'data' => []
            ]);
    }
    public function test_get_200_even_if_it_gets_for_inexistent_title(): void
    {
        $this->get("/api/examinations/title?title=inexistent")->assertStatus(200);
    }

    public function test_get_400_error_if_missing_title_parameter(): void
    {
        $this->get("/api/examinations/title?title=")
            ->assertStatus(400)
            ->assertJson([
                "message"=> "The title field is required.",
                "code"=> 400
            ]);
    }

}
