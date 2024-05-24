<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserFormRequest extends FormRequest
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
            'account_plan_id' => 'required|integer|exists:account_plans,id',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'username' => 'required|string',
            'profile_img' => 'nullable|string',
            'email' => 'required|email',
            'phone_number' => 'required|string',
            'password' => 'required|string',
            'sex' => 'nullable|string',
            'sexual_orientation' => 'nullable|string',
            'gender' => 'nullable|string',
            'race' => 'nullable|string',
            'disability' => 'nullable|string',
        ];
    }
}
