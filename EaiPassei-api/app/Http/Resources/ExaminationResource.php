<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExaminationResource extends JsonResource
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
            'educational_level' => $this->educationalLevel->name ?? null,
            'title' => $this->title,
            'institution' => $this->institution,
            'active' => $this->active,
            'exams_count' => count($this->exams),
            'exam_list' => ExamResource::collection($this->exams),
            'study_areas' => StudyAreaMinResource::collection($this->studyAreas),
        ];
    }
}
