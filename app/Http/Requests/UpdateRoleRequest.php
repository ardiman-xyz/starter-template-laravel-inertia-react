<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateRoleRequest extends FormRequest
{

    public function authorize(): bool
    {
        return Auth::hasUser();
    }


    public function rules(): array
    {
        return [
            "name" => "required"
        ];
    }
}
