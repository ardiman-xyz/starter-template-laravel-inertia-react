<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreScoreRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            "instrument_id"  => ["required"],
            "item_id"  => ["required"],
            "value"  => ["required"],
        ];
    }
}
