<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Examination;

class ExaminationsEducationalLevelRoutesTest extends TestCase
{
    public function test_get_200_code_examinations_by_educational_level(): void
    {
        $exampleExaminatiosList1 = Examination::factory(10)->create([
            'educational_level_id' => 4
        ]);

        $exampleExaminatiosList2 = Examination::factory(10)->create([
            'educational_level_id' => 2
        ]);


        $exampleExaminatiosList3 = Examination::factory(10)->create([
            'educational_level_id' => 3
        ]);


        $response = $this->getJson('/api/examinations/educational-level', ['educational-level' => 4]);
        $response->assertStatus(200);
    }

    public function test_get_400_if_missing_educational_level_id_parameter(): void
    {
        $response = $this->getJson('/api/examinations/educational-level');
        $response->assertStatus(400)->assertJson([
            "message" => "O parâmetro Nível de Escolaridade é obrigatório.",
            "code" => 400
        ]);
    }

    public function test_get_404_if_cant_find_examinations_with_given_educational_level_id(): void
    {
        $exampleExaminatiosList1 = Examination::factory(10)->create([
            'educational_level_id' => 4
        ]);

        $response = $this->getJson('/api/examinations/educational-level', ['educational-level' => '123123']);
        $response->assertStatus(404)->assertJson([
            "message" => "Nao foram encontrados registros com os dados fornecidos.",
            "code" => 404
        ]);
    }
}
