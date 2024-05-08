<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubjectFormRequest extends FormRequest
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
            'educational_level_id' => 'integer|required',
            'study_area_id' => 'integer|required',
            'title' => 'required|string|min:4',
        ];

    }

    public function attributes(): array
    {
        return [
            'educational_level_id' => 'id do nível de escolaridade',
            'study_area_id' => 'id da área de estudo',
            'title' => 'título',
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'O :attribute é obrigatório. Nenhum informado.',
            'integer' => 'O :attribute deve ser um número inteiro.',
            'title.string' => 'O :attribute deve estar em texto.',
            'title.min' => "O :attribute deve ter no mínimo 4 caracteres.",
        ];
    }
}
