<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;

class CreateRoleRequest extends FormRequest
{

    public function authorize(): bool
    {
        return Auth::hasUser();
    }


    public function rules(): array
    {
        return [
            "name" => "required|unique:roles"
        ];
    }


//    protected function failedValidation(Validator $validator)
//    {
//        throw new HttpResponseException(response([
//            "errors" => $validator->getMessageBag()
//        ]), 400);
//    }
}
