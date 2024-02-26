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
            'active' => 'required|boolean',
            'institution' => 'required|string',
            'registration_start_date' => 'string',
            'registration_end_date' => 'string',
            'exams_start_date' => 'string',
            'exams_end_date' => 'string',
        ];
    }

    public function messages(): array
    {
        return [
            'educational_level_id.required' => 'O concurso informado precisa estar associado a um nivel de escolaridade. Nenhum informado.',
            'educational_level_id.integer' => 'O nivel educacional informado deve estar no formato integer.',
            'title.required' => 'A title is required.',
            'title.string' => 'The value of title should be a string.',
            'active.required' => 'It is necessary to indicate whether the examination is currently active.',
            'active.boolean' => 'The value of active should be a boolean.',
            'institution.required' => 'It is necessary to indicate an institution.',
            'institution.string' => 'The value of institution should be a string.'
        ];
    }
}
