<?php

namespace Tests\Feature;

use App\Models\EducationalLevel;
use App\Models\ServiceResponse;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Notice;
use Tests\TestCase;
use App\Models\Examination;
use App\Services\ExaminationService;

class AllExaminationsAndIDRoutesTest extends TestCase
{
    use RefreshDatabase;
    public function test_get_200_code_all_examinations_page_1(): void
    {
        EducationalLevel::factory(5)->create();
        Examination::factory(20)->create([
            'educational_level_id' => 4,
        ]);
        Examination::all()->each(function(Examination $examination) {
            Notice::factory()->create([
                'examination_id' => $examination->id,
            ]);
        });
        $response = $this->get('/api/examinations/all');
        $data = $response->json();
        $response->assertStatus(200);
        $response->assertJsonStructure(['data']);
        $data = $response->json();
        $result = $data['data'];
        $this->assertIsArray($result);
        $this->assertCount(15, $result);
    }

    public function test_get_200_code_examinations_by_id(): void
    {
        $educationalLevel2 = EducationalLevel::factory()->create([
            'id' => 2,
            'name' => 'Tecnico'
        ]);
        
        $educationalLevel4 = EducationalLevel::factory()->create([
            'id' => 4,
            'name' => 'Graduacao'
        ]);
        Examination::factory()->create([
            'id' => 1,
            'educational_level_id' => $educationalLevel4->id,
        ]);
    
        $response = $this->get("/api/examinations/1")->assertJsonStructure([
            'id',
            'title',
        ]);
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertIsArray($data);
    }

    public function test_get_204_code_if_doesnt_find_any_examinations(): void
    {
        $response = $this->getJson('/api/examinations/all');
        $response->assertStatus(204);
    }

    public function test_get_204_no_content_if_get_for_inexistent_id():void
    {
        $examination = Examination::factory()->create([
            'educational_level_id' => 4,
        ]);
        $response = $this->get("/api/examinations/400");
        $response->assertStatus(204);
    }

    public function test_get_400_if_invalid_order_parameter():void
    {
        Examination::factory(5)->create([
            'title' => 'teste',
            'educational_level_id' => 4,
        ]);

        $response = $this->getJson("/api/examinations/title?order=qwerty", ['title' => 'wer']);
        $response->assertStatus(400)->assertJson(        [
            "message"=> "Parâmetro de ordenação inválido. Use \"asc\" ou \"desc\".",
            "code"=> 400
        ]);
    }
}
