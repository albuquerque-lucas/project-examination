<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "study_area_id" => $this->study_area_id,
            "educational_level_id" => $this->educational_level_id,
            "title" => $this->title,
            "study_area" => $this->studyArea->area,
            "educational_level" => $this->educationalLevel->name,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
