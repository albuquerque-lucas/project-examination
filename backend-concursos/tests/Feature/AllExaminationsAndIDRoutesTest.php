<?php

namespace Tests\Feature;

use App\Models\EducationalLevel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Notice;
use Tests\TestCase;
use App\Models\Examination;

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
            Notice::factory()->count(1)->create([
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

    public function test_get_404_code_if_doesnt_find_any_examinations(): void
    {
        $response = $this->getJson('/api/examinations/all');
        $response->assertStatus(204);
    }

    public function test_get_200_code_examinations_by_id(): void
    {
        EducationalLevel::factory(5)->create();
        $examination = Examination::factory(5)->create([
            'educational_level_id' => 4,
        ]);
        Examination::all()->each(function(Examination $examination) {
            Notice::factory()->count(1)->create([
                'examination_id' => $examination->id,
            ]);
        });
        $response = $this->get("/api/examinations/examination-id?id=1");
        $response->assertStatus(200);
        
        // $response->assertJsonStructure([
        //     "data",
        // ]);
        
        // $data = $response->json();
        // $this->assertEquals($examination->id, $data['id']);
    }

    // public function test_get_400_if_bad_request_when_finding_by_id(): void
    // {

    // }

    public function test_get_204_no_content_if_get_for_inexistent_id():void
    {
        Examination::factory()->create([
            'educational_level_id' => 4,
        ]);
        $response = $this->get("/api/examinations/examination-id?id=400");
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

    public function testes_get_400_if_invalid_or_missing_id_parameter(): void
    {
        $response = $this->getJson("/api/examinations/examination-id?id=");
        $response->assertStatus(400)->assertJson([
            "message"=> "O parâmetro Id é obrigatório.",
            "code"=> 400
        ]);
    }
}
