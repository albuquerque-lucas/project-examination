<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Examination;
use Database\Seeders\EducationalLevelsSeeder;
use Database\Seeders\ExaminationSeeder;

class ExaminationsRegistrationDateRoutesTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_200_code_examinations_by_date():void
    {
        $requestData = [
            'educational_level_id' => 4,
            'title' => 'Concurso de Teste 01',
            'active' => true,
            'institution' => 'Instituicao do teste 01',
            'registration_start_date' => '2025-02-15',
            'registration_end_date' => '2025-03-16',
            'exams_start_date' => '2025-04-14',
            'exams_end_date' => '2025-04-21',
        ];

        $this->postJson('api/examinations/create', $requestData);

        $this->getJson("/api/examinations/registration-date?registrationDate=2025-02-15")
            ->assertStatus(200)
            ->assertJsonCount(1, 'data');

    }
    public function test_get_400_if_registration_date_is_missing(): void
    {
        $this->getJson("/api/examinations/registration-date")
            ->assertStatus(400)
            ->assertJson([
                'message' => 'The registration date field is required.',
                'code' => 0,
            ]);
    } 

    public function test_get_400_if_date_is_in_invalid_format():void
    {

        $this->getJson("/api/examinations/registration-date?registrationDate=25")
            ->assertStatus(400)
            ->assertJson([
                "message" => "The registration date field must match the format Y-m-d.",
                "code" => 0
            ]);
    }
}
