<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Examination;

class ExaminationsRegistrationDateRoutesTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_200_code_examinations_by_date():void
    {
        $testStartDate = '2025-02-01';
        $testEndDate = '2025-03-21';

        Examination::factory(5)->create([
            'educational_level_id' => 4,
        ]);

        $examinationTest = Examination::factory()->create([
            'educational_level_id' => 4,
            'registration_start_date' => $testStartDate,
            'registration_end_date' =>  $testEndDate,
        ]);

        $response = $this->getJson("/api/examinations/registration-date", ['registrationDate' => $testStartDate]);
        $response->assertStatus(200);
        $result = $response->json();
        $data = $result['data'];
        $formattedDate = $examinationTest->registration_start_date->format('Y-m-d');

        $this->assertCount(1, $data);
        $this->assertEquals($examinationTest->title, $data[0]['title']);
        $this->assertEquals($examinationTest->institution, $data[0]['institution']);
        $this->assertEquals($formattedDate, $data[0]['registration_start_date']);

    }
    public function test_get_400_if_registration_date_is_missing(): void
    {
        $exampleRegistrationStartDate = '2024-04-04';

        Examination::factory(5)->create([
            'educational_level_id' => 4,
        ]);

        $examinationTest = Examination::factory()->create([
            'educational_level_id' => 4,
            'title' => 'Concurso para buscar por data',
            'institution' => 'Instituicao teste registration date',
            'registration_start_date' => $exampleRegistrationStartDate,
            'registration_end_date' =>  '2024-04-24',
        ]);
        $response = $this->getJson("/api/examinations/registration-date");
        $result = $response->json();
        $response->assertStatus(400)->assertJson($result);
    } 

    public function test_get_400_if_date_is_in_invalid_format():void
    {
        $exampleRegistrationStartDate = '2024-04-04';

        Examination::factory(5)->create([
            'educational_level_id' => 4,
        ]);

        $examinationTest = Examination::factory()->create([
            'educational_level_id' => 4,
            'title' => 'Concurso para buscar por data',
            'institution' => 'Instituicao teste registration date',
            'registration_start_date' => $exampleRegistrationStartDate,
            'registration_end_date' =>  '2024-04-24',
        ]);
        $response = $this->getJson("/api/examinations/registration-date", ['registrationDate' => 25]);

        $response->assertStatus(400)->assertJson(        [
            "message" => "Data informada no formato inválido. Utilize YYYY-MM-DD.",
            "code" => 400
        ]);
    }
}
