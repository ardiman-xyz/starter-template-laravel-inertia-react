<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AcademicSemesterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'year' => 'required|string|min:2',
            'semester' => 'required|string|min:1',
            'academic_year' => 'required|string|min:1',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ];
    }


    public function messages(): array
    {
        return [
            'year.required' => 'Input harus di isi',
            'year.string' => 'Input harus berupa string',
            'year.min' => 'Input harus memiliki minimal 2 karakter',

            'semester.required' => 'Input harus di isi',
            'semester.string' => 'Input harus berupa string',
            'semester.min' => 'Input harus memiliki minimal 1 karakter',

            'academic_year.required' => 'Input harus di isi',
            'academic_year.string' => 'Input harus berupa string',
            'academic_year.min' => 'Input harus memiliki minimal 1 karakter',

            'start_date.required' => 'Input harus di isi',
            'start_date.date' => 'Input harus berupa tanggal yang valid',

            'end_date.required' => 'Input harus di isi',
            'end_date.date' => 'Input harus berupa tanggal yang valid',
            'end_date.after_or_equal' => 'Tanggal akhir harus sama atau setelah tanggal mulai',
        ];
    }
}
