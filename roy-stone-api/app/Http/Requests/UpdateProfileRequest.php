<?php

namespace App\Http\Requests;

use App\Helpers\Helpers;
use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class UpdateProfileRequest extends FormRequest
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
        return [
            'name'     => ['max:255'],
            'email'    => ['email', 'unique:users,email,'.$id.',id,deleted_at,NULL'],
            'phone' => ['digits_between:6,15','unique:users,phone,'.$id.',id,deleted_at,NULL'],
            'role_id' => ['exists:roles,id,deleted_at,NULL'],
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
