<?php

namespace App\Http\Requests;

use App\Helpers\Helpers;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class UpdateOrderRequest extends FormRequest
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
            'consumer_id' => ['exists:users,id,deleted_at,NULL'],
            'tax_total' => ['numeric', 'min:0'],
            'shipping_total' => ['numeric', 'min:0'],
            'store_id' => ['exists:stores,id,deleted_at,NULL'],
            'order_status_id' => ['exists:order_status,id,deleted_at,NULL'],
            'payment_method' => ['string'],
            'products' => ['array'],
            'products.*.product_id' => ['exists:products,id,deleted_at,NULL'],
            'products.*.variation_id' => ['nullable','exists:variations,id'],
            'billing_address_id' => ['exists:addresses,id,deleted_at,NULL', 'nullable'],
            'shipping_address_id'=>['exists:addresses,id,deleted_at,NULL', 'nullable'],
            'delivery_interval' => ['string'],
            'coupon_id' => ['exists:coupons,id,deleted_at,NULL'],
            'status' => ['min:0','max:1'],
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
