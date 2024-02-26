<?php

namespace Tests\Feature;

use App\Models\Examination;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ExaminationTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_user_can_create_an_examination_register(): void
    {
        // $examination = Examination::factory()->create([
        //     'educational_level_id' => 4,
        // ]);
        $response = $this->post('api/create/examination', [
            'educational_level_id' => 4,
            'title' => 'Concurso de Teste 01',
            'active' => true,
            'institution' => 'Instituicao do teste 01',
            'registration_start_date' => '25-02-15',
            'registration_end_date' => '25-03-16',
            'exams_start_date' => '25-04-14',
            'exams_end_date' => '25-04-21',
        ]);
        $response->assertStatus(201);
        // // $response = $this->get('/');

        // // $response->assertStatus(200);
    }

    public function test_user_can_get_examinations_registers_page_1(): void
    {
        // $examinationList = Examination::all();
        $response = $this->getJson('/api/examinations/all');
        $response->assertStatus(200);
    }
}
