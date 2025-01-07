<?php

namespace App\Http\Requests;

use App\Enums\AmountEnum;
use Illuminate\Support\Facades\Request;
use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class UpdateCouponRequest extends FormRequest
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
        $id = $this->route('coupon') ? $this->route('coupon')->id : $this->id;
        $coupon = [
            'title' => ['required'],
            'description' => ['required'],
            'code'  => ['required', 'min:5','max:20', 'unique:coupons,code,'.$id.',id,deleted_at,NULL'],
            'type' => ['required', 'in:free_shipping,fixed,percentage'],
            'min_spend' => ['nullable','numeric', 'min:0'],
            'is_unlimited' => ['required', 'boolean'],
            'usage_per_coupon' => ['nullable','numeric'],
            'usage_per_customer' => ['nullable','numeric'],
            'status' => ['min:0','max:1'],
            'is_expired' => ['min:0','max:1'],
            'is_first_order' => ['min:0','max:1'],
            'is_apply_all' => ['required','min:0','max:1'],
            'exclude_products' => ['nullable','array','exists:products,id,deleted_at,NULL'],
            'start_date' => ['nullable','date'],
            'end_date' => ['nullable','date', 'after:start_date'],
            'products' => ['nullable', 'array','required_if:is_apply_all,==,0','exists:products,id,deleted_at,NULL'],
        ];

        if (Request::input('type') == AmountEnum::PERCENTAGE) {
            return array_merge($coupon, ['amount' => ['required', 'regex:/^([0-9]{1,2}){1}(\.[0-9]{1,2})?$/']]);
        }

        return $coupon;
    }

    public function messages()
    {
        return [
            'amount.regex' => 'Enter amount percentage between 0 to 99.99',
            'type.in' => 'Coupon type can be free_shipping or fixed or percentage',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
