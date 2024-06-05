<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamQuestionResource extends JsonResource
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
            'exam_id' => $this->exam_id,
            'subject_id' => $this->subject_id | null,
            'topic_id' => $this->topic_id | null,
            'exam' => $this->exam->title,
            'subject' => optional($this->subject)->title,
            'topic' => optional($this->topic)->title,
            'question_number' => $this->question_number,
            'statement' => $this->statement,
            'alternatives' => ExamQuestionAlternativeResource::collection($this->alternatives),
            // 'images' => ExamQuestionImageResource::collection($this->images),
        ];
    }
}
