<?php

namespace Tests\Feature;

use App\Models\EducationalLevel;
use Database\Seeders\ExaminationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Examination;
use Database\Seeders\EducationalLevelsSeeder;

class ExaminationsGeneralRoutesTest extends TestCase
{
    use RefreshDatabase;
    public function test_get_200_code_all_examinations(): void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);
        $this->get('/api/examinations/all')
            ->assertStatus(200)
            ->assertJsonCount(15, 'data');
    }

    public function test_get_200_code_examinations_by_id(): void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);;
    
        $this->get("/api/examinations/id/98")
            ->assertStatus(200)
            ->assertJson([
                "id" => 98,
                "title" => "Concurso para Auditor Fiscal do Estado do Rio de Janeiro",
                "institution" => "Governo Federal",
                "active" => true,
            ]);
    }

    public function test_get_200_code_even_if_doesnt_find_any_examinations(): void
    {
        $this->getJson('/api/examinations/all')->assertStatus(200);
    }

    public function test_get_204_no_content_if_get_for_inexistent_id():void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);

        $this->get("/api/examinations/id/400")->assertStatus(204);
    }

    public function test_get_400_if_invalid_order_parameter():void
    {
        $this->seed(EducationalLevelsSeeder::class);
        $this->seed(ExaminationSeeder::class);

        $this->getJson("/api/examinations/title?order=qwerty&title=Test")
            ->assertStatus(400)->assertJson([
                "message"=> "The selected order is invalid.",
                "code"=> 400
            ]);
    }
}
