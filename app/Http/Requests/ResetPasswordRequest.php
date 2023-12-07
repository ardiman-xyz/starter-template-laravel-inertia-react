<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "id"    => ["required", "string"],
            "password"    => ["required", "string", "min:4", "max:255"],
        ];
    }
}
