<?php

namespace App\Http\Requests;

use App\Helpers\Helpers;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class CalculateCheckoutRequest extends FormRequest
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
            'consumer_id' => ['exists:users,id,deleted_at,NULL', 'nullable'],
            'products' => ['required','array'],
            'products.*.product_id' => ['required','exists:products,id,deleted_at,NULL'],
            'products.*.variation_id' => ['nullable','exists:variations,id,deleted_at,NULL'],
            'coupon' => ['nullable','exists:coupons,code,deleted_at,NULL'],
            'payment_method' => ['required'],
            'billing_address_id' => [Rule::requiredIf(function () {
                return Helpers::isUserLogin();
            }), 'exists:addresses,id,deleted_at,NULL', 'nullable'],
            'shipping_address_id'=>[Rule::requiredIf(function () {
                return ((Helpers::isUserLogin()) && (!Helpers::isDigitalOnly($this->products)));
            }), 'exists:addresses,id,deleted_at,NULL', 'nullable'],
            'shipping_address' => ['array', Rule::requiredIf(function () {
                return ((!Helpers::isUserLogin()) && (!Helpers::isDigitalOnly($this->products)));
            })],
            'billing_address' => ['array', Rule::requiredIf(function () {
                return !(Helpers::isUserLogin());
            })]
        ];
    }

    public function messages()
    {
        return [
            'coupon.exists' => "We could not find an {$this->coupon} coupon.",
            'shipping_address.required' => "The shipping address field is required for guest checkout.",
            'billing_address.required' => "The billing address field is required for guest checkout.",
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }

    protected function prepareForValidation()
    {
        if (!Helpers::isUserLogin()) {
            if (!Helpers::isGuestCheckoutEnabled()) {
                throw new ExceptionHandler("Currently Guest checkout feature is disabled. ", 422);
            }
        }
    }
}
