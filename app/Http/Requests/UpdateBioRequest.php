<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBioRequest extends FormRequest
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
            'name' => 'required|string|min:2',
            'email' => 'required|email',
            'gender' => 'required|string',
            'address' => 'nullable|string',
            'nip' => 'nullable|string',
            'phone' => 'nullable|string'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama wajib diisi',
            'name.min' => 'Nama minimal 2 karakter',

            'email.required' => 'Email wajib diisi',
            'email.email' => 'Email tidak valid',

            'gender.required' => 'Jenis kelamin wajib diisi',
        ];
    }
}
