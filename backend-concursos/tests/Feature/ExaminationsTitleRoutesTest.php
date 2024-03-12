<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Examination;
use App\Models\EducationalLevel;

class ExaminationsTitleRoutesTest extends TestCase
{
    use RefreshDatabase;
    public function test_get_200_code_examinations_by_title(): void
    {
        $educationalLevel4 = EducationalLevel::factory()->create([
            'id' => 4,
            'name' => 'Pos-Graduacao'
        ]);
        $exampleExamination1 = Examination::factory()->create([
            'title' => 'Examination Test Example Raziel',
            'educational_level_id' => $educationalLevel4->id,
        ]);

        $exampleExamination2 = Examination::factory()->create([
            'title' => 'Examination Test Example Two',
            'educational_level_id' => $educationalLevel4->id,
        ]);

        $exampleExamination3 = Examination::factory()->create([
            'title' => 'Examination Test Example Raziel Two',
            'educational_level_id' => $educationalLevel4->id,
        ]);

        $response = $this->getJson('/api/examinations/title?title=Raziel');
        $response->assertStatus(200);
        $result = $response->json();
        $data = $result['data'];
        $response->assertJsonStructure(['data']);
        $this->assertCount(2, $data);
        $this->assertEquals($exampleExamination1->id, $data[1]['id']);
        $this->assertEquals($exampleExamination3->title, $data[0]['title']);
    }
    public function test_get_200_even_if_it_gets_for_inexistent_title(): void
    {
        Examination::factory(4)->create([
            'educational_level_id' => 4,
        ]);

        $response = $this->get("/api/examinations/title?title=inexistent");
        $response->assertStatus(200);
    }

    public function test_get_400_error_if_missing_title_parameter(): void
    {
        Examination::factory(4)->create([
            'educational_level_id' => 4,
        ]);

        $response = $this->get("/api/examinations/title?title=");
        $response->assertStatus(400)->assertJson([
            "message"=> "The title field is required.",
            "code"=> 400
        ]);
    }

}
