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

    public function attributes(): array
    {
        return [
            'educational_level_id' => 'nivel de escolaridade',
            'title' => 'título',
            'active' => 'ativo',
            'institution' => 'instituição',
            'registration_start_date' => 'data de início de inscrição',
            'registration_end_date' => 'data de término de inscrição',
            'exams_start_date' => 'data de início da prova',
            'exams_end_date' => 'data de término da prova',
        ];
    }

    public function messages(): array
    {
        return [
            'educational_level_id.required' => 'O :attribute do concurso é obrigatório. Nenhum foi informado.',
            'educational_level_id.integer' => 'O :attribute do concurso deve ser um número inteiro.',
            'title.required' => 'É necessário informar um :attribute.',
            'title.string' => 'O :attribute deve ser uma string.',
            'active.boolean' => 'O :attribute deve ser verdadeiro ou falso.',
            'institution.required' => 'É necessário informar uma :attribute.',
            'institution.string' => 'A :attribute deve ser uma string.',
        ];
    }
}
