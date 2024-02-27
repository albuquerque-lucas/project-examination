<?php

namespace Tests\Feature;

use App\Models\Examination;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\TestResponse;
use SebastianBergmann\Type\VoidType;
use Tests\TestCase;

class ExaminationTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_user_can_create_an_examination_register(): void
    {
        $requestData = [
            'educational_level_id' => 4,
            'title' => 'Concurso de Teste 01',
            'active' => true,
            'institution' => 'Instituicao do teste 01',
            'registration_start_date' => '25-02-15',
            'registration_end_date' => '25-03-16',
            'exams_start_date' => '25-04-14',
            'exams_end_date' => '25-04-21',
        ];

        $responseData = [
            'id' => 1,
            'educational_level_id' => 4,
            'title' => 'Concurso de Teste 01',
            'active' => 1,
            'institution' => 'Instituicao do teste 01',
            'registration_start_date' => '2025-02-15',
            'registration_end_date' => '2025-03-16',
            'exams_start_date' => '2025-04-14',
            'exams_end_date' => '2025-04-21',
        ];

        $response = $this->post('api/create/examination', $requestData);
        $response->assertStatus(201)->assertJson($responseData);
    }

    public function test_user_can_get_examinations_registers_page_1(): void
    {
        Examination::factory(20)->create([
            'educational_level_id' => 4,
        ]);
        $response = $this->getJson('/api/examinations/all');
        $response->assertStatus(200);
        $response->assertJsonStructure(['data']);
        $data = $response->json();
        $result = $data['data'];
        $this->assertIsArray($result);
        $this->assertCount(15, $result);
    }

    public function test_get_by_title(): void
    {
        $exampleExamination = Examination::factory()->create([
            'title' => 'Concurso Exemplo Teste',
            'educational_level_id' => 4,
        ]);

        $examinationList = Examination::factory(29)->create([
            'educational_level_id' => 2,
        ]);
    }
}
