<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Validator;

class ExaminationFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'educational_level_id' => 'required|integer',
            'title' => 'required|string',
            'active' => 'boolean',
            'institution' => 'required|string',
            'registration_start_date' => 'string',
            'registration_end_date' => 'string',
            'exams_start_date' => 'string',
            'exams_end_date' => 'string',
        ];
    }
}
