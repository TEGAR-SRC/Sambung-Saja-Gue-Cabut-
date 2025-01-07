<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Helpers\Helpers;
use Illuminate\Contracts\Validation\Validator;

class UpdatePaymentAccountRequest extends FormRequest
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
        $id = Helpers::getCurrentUserId();
        return  [
            'paypal_email' => ['nullable', 'unique:payment_accounts,paypal_email,'.$id.',user_id,deleted_at,NULL'],
            'bank_account_no' => ['nullable','unique:payment_accounts,bank_account_no,'.$id.',user_id,deleted_at,NULL'],
            'bank_name' => ['nullable','string'],
            'bank_holder_name' => ['nullable', 'string'],
            'swift' => ['nullable', 'string'],
            'ifsc' => ['nullable', 'string'],
            'is_default' => ['nullable','min:0','max:1'],
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
