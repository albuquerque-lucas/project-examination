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
            'examination_id' => 'required|integer',
            'file_path' => 'required|string',
            'file_name' => 'nullable|string',
            'publication_date' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'examination_id.required' => 'Missing examination ID. Please provide an ID for the associated notice.',
            'examination_id.integer' => 'The examination ID must be an integer.',
            'file.required' => 'Missing file information. Please provide a file path.',
            'file.string' => 'The file path must be a string.',
            'file_name.string' => 'The file name must be a string.',
            'publication_date' => 'The publication date must be a valid date.',
        ];
    }
}
