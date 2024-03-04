<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\FlareClient\Http\Exceptions\NotFound;

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
            'areas' => $this->areas,
            'title' => $this->title,
            'institution' => $this->institution,
            'educational_level' => $this->educationalLevel->name,
            'active' => $this->active,
            'notice_path' => $this->notice->file,
            'registration_start_date' => $this->registration_start_date,
            'registration_end_date' => $this->registration_end_date,
            'exams_start_date' => $this->exams_start_date,
            'exams_end_date' => $this->exams_end_date,
            'exams_count' => count($this->exams),
            'exam_list' => $this->exams,
        ];
    }
}
