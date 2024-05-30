<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExamQuestionFormRequest extends FormRequest
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
            'questions' => 'required|array',
            'questions.*.exam_id' => 'required|integer',
            'questions.*.subject_id' => 'nullable|integer',
            'questions.*.topic_id' => 'nullable|integer',
            'questions.*.question_number' => 'required|integer',
            'questions.*.statement' => 'nullable|string',
        ];
    }
}
