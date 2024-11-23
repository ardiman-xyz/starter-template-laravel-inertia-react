<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AnswerAssessmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'link' => 'required|string|url',
            'componentId' => 'required|exists:components,id'
        ];
    }

    /**
     * Get custom error messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'link.required' => 'Link is required',
            'link.url' => 'Link must be a valid URL',
            'componentId.required' => 'Component ID is required',
            'componentId.exists' => 'Selected component does not exist'
        ];
    }
}
