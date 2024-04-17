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
            'file_name' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'examination_id.required' => 'Missing examination ID. Please provide an ID for the associated notice.',
            'examination_id.integer' => 'The examination ID must be an integer.',
            'file_name.string' => 'The file name must be a string.',
        ];
    }
}
