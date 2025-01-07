<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class CreateCurrencyRequest extends FormRequest
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
            'code'  => ['required', 'string', 'unique:currencies,code,NULL,id,deleted_at,NULL'],
            'symbol' => ['string'],
            'no_of_decimal' => ['min:0'],
            'exchange_rate' => ['min:0'],
            'symbol_position' => ['required','in:before_price,after_price'],
            'thousands_separator' => ['nullable','in:comma,period,space'],
            'decimal_separator' => ['nullable','in:comma,period,space'],
            'status' => ['min:0','max:1'],
        ];
    }

    public function messages()
    {
        return [
            'code.unique' => 'Currency has been already been taken',
            'symbol_position.in' => 'Symbol Position can be either before_price or after_price',
            'thousands_separator.in' => 'Thousands Separator can be either comma, period or space',
            'decimal_separator.in' => 'Decimal Separator can be either comma, period or space',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
