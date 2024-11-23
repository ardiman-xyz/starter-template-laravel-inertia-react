<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateItemRequest extends FormRequest
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
            "id"    => ["required"],
            'name' => 'required|string|max:255',
            'max_Score' => 'required|integer|min:1|max:4'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Nama komponen harus diisi',
            'name.string' => 'Nama harus berupa text',
            'name.max' => 'Nama maksimal 255 karakter',
            'max_Score.required' => 'Skor maksimal harus diisi',
            'max_Score.integer' => 'Skor maksimal harus berupa angka',
            'max_Score.min' => 'Skor minimal adalah 1',
            'max_Score.max' => 'Skor maksimal adalah 4'
        ];
    }
}
