<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Request;
use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class UpdateShippingRuleRequest extends FormRequest
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
        $shippingRules = [
            'name'  => ['required', 'max:255'],
            'rule_type' => ['required', 'in:base_on_price,base_on_weight'],
            'shipping_type' => ['required', 'in:free,fixed,percentage'],
            'min' => ['required', 'numeric', 'min:0'],
            'max' => ['required', 'numeric', 'min:' . (float)$this->input('min')],
            'amount' => ['numeric'],
            'shipping_id' => ['required', 'exists:shippings,id,deleted_at,NULL'],
        ];

        if (Request::input('shipping_type') == 'percentage') {
            return array_merge($shippingRules, ['amount' => ['required', 'regex:/^([0-9]{1,2}){1}(\.[0-9]{1,2})?$/']]);
        }

        return $shippingRules;
    }

    public function messages()
    {
        return [
            'amount.regex' => 'Enter amount percentage between 0 to 99.99',
            'shipping_type.in' => 'Shipping type can be free or fixed or percentage',
            'rule_type.in' => 'Shipping Rule type can be either base_on_price or base_on_weight',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
