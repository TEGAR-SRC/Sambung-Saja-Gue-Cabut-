<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class CreateRefundRequest extends FormRequest
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
            'reason' => ['required','string'],
            'product_id' => ['required','exists:products,id,deleted_at,NULL'],
            'payment_type' => ['required', 'in:paypal,bank,wallet'],
            'refund_image_id' => ['exists:attachments,id,deleted_at,NULL'],
        ];
    }

    public function messages()
    {
        return [
            'payment_type.in' => 'Payment type should be paypal or bank or wallet',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
