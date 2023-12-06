<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRegisterRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "name" => ["required", "string", "max:255"],
            'email'     => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)],
            "password"  => ["required", "string", "max:255", "min:5"]
        ];
    }
}
