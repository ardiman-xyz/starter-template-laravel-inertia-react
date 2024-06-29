<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCoverRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'image' => 'required|image|mimes:webp,png,jpg|max:2048|dimensions:width=900,height=400',
        ];
    }

    public function messages(): array
    {
        return [
            'image.required' => 'Gambar harus diunggah.',
            'image.image' => 'File yang diunggah harus berupa gambar.',
            'image.mimes' => 'Format gambar yang diizinkan: jpeg, png, jpg, gif.',
            'image.max' => 'Ukuran gambar tidak boleh lebih dari 2MB.',
            'image.dimensions' => 'Dimensi gambar harus 900x400 piksel.',
        ];
    }
}
