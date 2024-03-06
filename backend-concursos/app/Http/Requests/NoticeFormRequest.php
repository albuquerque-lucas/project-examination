<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NoticeFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'examination_id' => 'required|integer',
            'file' => 'required|string',
            'file_name' => 'string',
            'publication_date' => 'string',
        ];
    }

    public function attributes(): array
    {
        return [
            'examination_id' => 'identificador do concurso',
            'file' => 'arquivo',
            'file_name' => 'nome do arquivo',
            'publication_date' => 'data de publicação'
        ];
    }

    public function messages(): array
    {
        return [
            'examination_id.required' => 'É necessário informar o :attribute',
            'examination_id.integer' => 'O :attribute deve ser um inteiro.',
            'file.required' => 'É necessário informar o caminhao de um :attribute.',
            'file.string' => 'O valor do caminho do :attribute deve ser uma string.',
            'file_name.string' => 'O :attribute deve ser uma string.',
            'publication_date' => 'A :attribute deve ser uma string.',
        ];
    }
}
