<?php

namespace App\Http\Requests;

use App\Helpers\Helpers;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class CreateOrderRequest extends FormRequest
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
        $rules = [
            'consumer_id' => ['nullable','exists:users,id,deleted_at,NULL'],
            'products' => ['required','array'],
            'products.*.product_id' => ['required','exists:products,id,deleted_at,NULL'],
            'products.*.variation_id' => ['nullable','exists:variations,id,deleted_at,NULL'],
            'coupon' => ['nullable','exists:coupons,code,deleted_at,NULL'],
            'billing_address_id' => [Rule::requiredIf(function () {
                return Helpers::isUserLogin();
            }), 'exists:addresses,id,deleted_at,NULL', 'nullable'],
            'shipping_address_id'=>[Rule::requiredIf(function () {
                return (Helpers::isUserLogin() && Helpers::isPhysicalOnly($this->products));
            }), 'exists:addresses,id,deleted_at,NULL', 'nullable'],
            'shipping_address' => ['array', Rule::requiredIf(function () {
                return ((!Helpers::isUserLogin()) && Helpers::isPhysicalOnly($this->products));
            })],
            'billing_address' => ['array', Rule::requiredIf(function () {
                return !(Helpers::isUserLogin());
            })],
            'payment_method' => ['string', 'in:razorpay,paystack,flutter_wave,phonepe,sslcommerz,instamojo,paypal,stripe,mollie,bank_transfer,bkash,ccavenue,cod'],
            'delivery_interval' => ['nullable','string'],
            'name' => [
                Rule::requiredIf(function () {
                    return !(Helpers::isUserLogin());
                })
            ],
            'email' => [
                Rule::requiredIf(function () {
                    return !(Helpers::isUserLogin());
                }),
            ],
            'create_account' => [
                Rule::requiredIf(function () {
                    return !(Helpers::isUserLogin());
                }),'min:0','max:1', 'nullable'
            ],
            'country_code' => [
                Rule::requiredIf(function () {
                    return !(Helpers::isUserLogin());
                }), 'nullable'
            ],
            'phone' => [
                Rule::requiredIf(function () {
                    return !(Helpers::isUserLogin());
                }), 'digits_between:6,15','unique:users,phone,NULL,id,deleted_at,NULL', 'nullable'
            ],
            'password' => ['required_if:create_account,1', 'min:8',  'nullable'],
            'password_confirmation' => ['required_if:create_account,1', 'same:password', 'nullable'],
        ];

        if ($this->create_account) {
            return array_merge($rules, [
                'email' => ['required', 'unique:users,email,NULL,id,deleted_at,NULL'],
                'phone' => ['required', 'digits_between:6,15','unique:users,phone,NULL,id,deleted_at,NULL'],
            ]);
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'coupon.exists' => "We could not find an {$this->coupon} coupon.",
            'create_account.required' => "The create account field is required for guest checkout.",
            'name.required' => "The name field is required for guest checkout.",
            'email.required' => "The email field is required for guest checkout.",
            'country_code.required' => "The country code field is required for guest checkout.",
            'phone.required' => "The phone field is required for guest checkout.",
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
