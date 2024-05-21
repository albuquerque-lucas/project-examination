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
            'subject_id' => $this->subject_id,
            'topic_id' => $this->topic_id,
            // 'exam' => $this->exam->title,
            'subject' => $this->subject->name,
            'topic' => $this->topic->name,
            'statement' => $this->statement,
            'alternatives' => ExamQuestionAlternativeResource::collection($this->alternatives),
            // 'images' => ExamQuestionImageResource::collection($this->images),
        ];
    }
}
