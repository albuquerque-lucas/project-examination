<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamResource extends JsonResource
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
            'examination_id' => $this->examination_id,
            'title' => $this->title,
            'examination' => $this->examination->title ?? "Não informado",
            'description'=> $this->description,
            'date' => $this->date,
            'subjects' => SubjectMinResource::collection($this->subjects),
            'questions_count' => count($this->examQuestions),
            // 'questions' => ExamQuestionResource::collection($this->examQuestions),
        ];
    }
}
