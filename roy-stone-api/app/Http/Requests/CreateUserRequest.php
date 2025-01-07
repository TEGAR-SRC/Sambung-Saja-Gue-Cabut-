<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class CreateUserRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email,NULL,id,deleted_at,NULL'],
            'phone' => ['required', 'digits_between:6,15','unique:users,phone,NULL,id,deleted_at,NULL'],
            'password' => ['required', 'min:8'],
            'password_confirmation' => ['required', 'same:password'],
            'role_id' => ['exists:roles,id'],
            'status' => ['required'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'phone' => (string) $this->phone,
        ]);
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
