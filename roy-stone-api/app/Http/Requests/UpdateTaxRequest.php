<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class UpdateTaxRequest extends FormRequest
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
            'name'  => ['required', 'string', 'max:255'],
            'rate' => ['required', 'regex:/^([0-9]{1,2}){1}(\.[0-9]{1,2})?$/'],
            'country_id' => ['exists:countries,id'],
            'state_id' => ['exists:states,id'],
        ];
    }

    public function messages()
    {
        return [
            'rate.regex' => 'Enter Tax Rate between 0 to 99.99',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
