<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class TicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'prefix' => "required",
            'price' => "required|numeric",
            'release_date' => "required|date_format:Y-m-d",
            'max_usages' => "required|numeric"
        ];
    }

    public function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw (new ValidationException($validator,
         response()->json($validator->errors(), 422)));
    }
}
