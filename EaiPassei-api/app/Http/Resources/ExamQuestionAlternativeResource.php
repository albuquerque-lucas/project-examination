<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamQuestionAlternativeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'exam_question_id' => $this->exam_question_id,
            'letter' => $this->letter,
            'text' => $this->text,
            'is_answer' => $this->is_answer,
        ];
    }
}
