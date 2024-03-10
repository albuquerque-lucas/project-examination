<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NoticeResource extends JsonResource
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
            'file_path' => $this->file,
            'file_name' => $this->file_name,
            'publication_date' => $this->publication_date,
            'examination' => $this->examination? [
                'id' => $this->examination->id,
                'title' => $this->examination->title,
                'institution' => $this->examination->institution,
            ] : null,
        ];
    }
}
