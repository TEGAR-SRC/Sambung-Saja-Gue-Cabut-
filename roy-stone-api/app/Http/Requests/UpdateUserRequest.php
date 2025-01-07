<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class UpdateUserRequest extends FormRequest
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
        $id = $this->route('user') ? $this->route('user')?->id : $this->id;
        return [
            'name' => ['nullable', 'max:255'],
            'email' => ['nullable','email', 'unique:users,email,'.$id.',id,deleted_at,NULL'],
            'phone' => ['nullable','digits_between:6,15','unique:users,phone,'.$id.',id,deleted_at,NULL'],
            'role_id' => ['exists:roles,id'],
            'status' => ['min:0','max:1']
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
