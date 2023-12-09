<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateInstrumentRequest extends FormRequest
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
        $rules = [
            'name' => 'required|string|max:255',
            'response_type' => 'required|string',
            'description' => 'required|string'
        ];

        if($this->response_type === 'upload') {

            $rules['allowed_extensions'] = 'required';
            $rules['max_size'] = 'required|integer';
            $rules['is_multiple'] = 'required';

        }

        return $rules;
    }
}
