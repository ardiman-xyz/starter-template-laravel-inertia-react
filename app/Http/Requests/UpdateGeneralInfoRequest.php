<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGeneralInfoRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        return [
            'school_name' => 'required|string|min:2',
            'leader_name' => 'required|string|min:1',
            'address' => 'required|string|min:1',
            'npsn' => 'required|string',
            'education_level' => 'required|string',
            'school_status' => 'required|string',
            'email' => 'required|email',
        ];
    }

    public function messages()
    {
        return [
            'school_name.required' => 'Input harus di isi',
            'school_name.min' => 'Input harus di isi',
            'leader_name.required' => 'Input harus di isi',
            'leader_name.min' => 'Input harus di isi',
            'address.required' => 'Input harus di isi',
            'address.min' => 'Input harus di isi',
            'email.email' => 'Email tidak valid',
        ];
    }
}
