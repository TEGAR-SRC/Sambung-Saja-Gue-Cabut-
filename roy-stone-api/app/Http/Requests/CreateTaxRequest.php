<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class CreateTaxRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'  => ['required', 'string', 'max:255'],
            'rate' => ['required', 'regex:/^([0-9]{1,2}){1}(\.[0-9]{1,2})?$/'],
            'status' => ['required','min:0','max:1'],
        ];
    }

    public function messages()
    {
        return [
            'rate.regex' => 'Specify a tax rate between 0 and 99.99.',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
