<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Helpers\Helpers;
use Illuminate\Contracts\Validation\Validator;

class UpdateStoreProfileRequest extends FormRequest
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
            'store_name' => ['required','max:255','unique:stores,store_name,'.$this->id.',id,deleted_at,NULL'],
            'store_logo_id' => ['nullable','exists:attachments,id'],
            'facebook' => ['nullable', 'url'],
            'twitter' => ['nullable', 'url'],
            'instagram' => ['nullable', 'url'],
            'youtube' => ['nullable', 'url'],
            'pinterest' => ['nullable', 'url'],
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
            $this->merge([
                'id' => Helpers::getCurrentVendorStoreId()
            ]);
        }
    }
}
