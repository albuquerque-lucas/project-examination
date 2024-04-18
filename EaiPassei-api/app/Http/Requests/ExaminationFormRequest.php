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
            'examinations.*.educational_level_id' => 'required|integer',
            'examinations.*.title' => 'required|string',
            'examinations.*.active' => 'nullable|boolean',
            'examinations.*.institution' => 'required|string',
            'examinations.*.registration_start_date' => 'nullable|string',
            'examinations.*.registration_end_date' => 'nullable|string',
            'examinations.*.exams_start_date' => 'nullable|string',
            'examinations.*.exams_end_date' => 'nullable|string',
        ];
    }
}
