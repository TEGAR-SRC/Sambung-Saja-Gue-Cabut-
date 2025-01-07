<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class CreateStoreRequest extends FormRequest
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
            'store_name'   => ['required', 'string', 'max:255', 'unique:stores,store_name,NULL,id,deleted_at,NULL'],
            'description' => ['required', 'min:10'],
            'country_id' => ['required','exists:countries,id'],
            'state_id' => ['required','exists:states,id'],
            'city' => ['required'],
            'address' => ['required'],
            'pincode' => ['required'],
            'facebook' => ['nullable', 'url'],
            'twitter' => ['nullable', 'url'],
            'instagram' => ['nullable', 'url'],
            'youtube' => ['nullable', 'url'],
            'pinterest' => ['nullable', 'url'],
            'vendor_id' => ['nullable','exists:users,id,deleted_at,NULL'],
            'store_logo_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'name' => ['nullable', Rule::requiredIf(!$this->vendor_id)],
            'email'    => ['nullable',Rule::requiredIf(!$this->vendor_id), 'email', 'unique:users,email,NULL,id,deleted_at,NULL'],
            'phone'     => ['nullable', 'digits_between:6,15', Rule::requiredIf(!$this->vendor_id),'unique:users,phone,NULL,id,deleted_at,NULL'],
            'password' => ['nullable',Rule::requiredIf(!$this->vendor_id), 'min:8','confirmed'],
            'password_confirmation' => ['nullable', Rule::requiredIf(!$this->vendor_id)],
            'status' => ['required','min:0','max:1'],
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
