<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Helpers\Helpers;
use Illuminate\Contracts\Validation\Validator;

class UpdateStoreRequest extends FormRequest
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
            'store_name' => ['max:255','unique:stores,store_name,'.$this->id.',id,deleted_at,NULL'],
            'store_logo_id' => ['nullable','exists:attachments,id'],
            'vendor_id' => ['nullable','exists:users,id,deleted_at,NULL'],
            'facebook' => ['nullable', 'url'],
            'twitter' => ['nullable', 'url'],
            'instagram' => ['nullable', 'url'],
            'youtube' => ['nullable', 'url'],
            'pinterest' => ['nullable', 'url'],
            'email'    => ['nullable', 'email', 'unique:users,email,'.$this->user_id.',id,deleted_at,NULL'],
            'phone'     => ['nullable', 'digits_between:6,15','unique:users,phone,'.$this->user_id.',id,deleted_at,NULL'],
            'vendor_id' => ['exists:users,id,deleted_at,NULL'],
            'country_id' => ['exists:countries,id'],
            'state_id' => ['exists:states,id'],
            'status' => ['min:0','max:1'],
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }

    protected function prepareForValidation()
    {
        if (Helpers::isUserLogin()) {
            $id = $this->route('store') ? $this->route('store')->id : $this->id;
            $this->merge([
                'id' => $id,
                'user_id' => Helpers::getVendorIdByStoreId($id)
            ]);
        }
    }
}
