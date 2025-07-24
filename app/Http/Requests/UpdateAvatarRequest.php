<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAvatarRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'avatar' => 'required|image|mimes:webp,png,jpg|max:1048',
        ];
    }

    public function messages(): array
    {
        return [
            'avatar.required' => 'Foto harus diunggah.',
            'avatar.image' => 'File yang diunggah harus berupa gambar.',
            'avatar.mimes' => 'Format gambar yang diizinkan: jpeg, png, jpg, gif.',
            'avatar.max' => 'Ukuran gambar tidak boleh lebih dari 1MB.',
        ];
    }
}
