<?php

namespace App\Http\Requests;

use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class CreateWithdrawRequest extends FormRequest
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
        $roleName = Helpers::getCurrentRoleName();
        $withdrawRequest = [
            'payment_type' => ['nullable','required', 'in:paypal,bank'],
            'message' => ['required','string','min:1'],
            'amount' => ['required', 'numeric', 'nullable'],
        ];

        if ($roleName == RoleEnum::VENDOR || $roleName == RoleEnum::CONSUMER) {
            return array_merge($withdrawRequest, ['vendor_id' => ['exists:users,id,deleted_at,NULL']]);
        }

        return $withdrawRequest;
    }

    public function messages()
    {
        return [
            'payment_type.in' => 'Payment type should be paypal or bank',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
