<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Examination;

class AllExaminationsAndIDRoutesTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_200_code_all_examinations_page_1(): void
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

    public function test_get_200_code_examinations_by_id(): void
    {
        $examination = Examination::factory()->create([
            'educational_level_id' => 4,
        ]);
        $response = $this->get("/api/examinations/examination-id?id=$examination->id");
        $response->assertStatus(200);
        
        $response->assertJsonStructure([
            "id",
            "educational_level_id",
            "title",
            "active",
            "institution",
            "registration_start_date",
            "registration_end_date",
            "exams_start_date",
            "exams_end_date",
            "created_at",
            "updated_at"
        ]);
        
        $data = $response->json();
        $this->assertEquals($examination->id, $data['id']);
    }

    public function test_get_404_error_and_a_message_if_get_for_inexistent_id():void
    {
        Examination::factory()->create([
            'educational_level_id' => 4,
        ]);
        $response = $this->get("/api/examinations/examination-id?id=400");
        $response->assertStatus(404);
        
        $response->assertJsonStructure([
            "message"
        ]);
        
        $data = $response->json();
        $expectedMessage = "Não foram encontrados registros com os dados fornecidos.";
        $this->assertEquals($expectedMessage, $data['message']);
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
