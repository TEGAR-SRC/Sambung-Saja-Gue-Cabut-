<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class UpdateBrandRequest extends FormRequest
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
        $id = $this->route('brand') ? $this->route('brand')?->id : $this->id;
        return [
            'name'  => ['required', 'string', 'max:255', 'unique:brands,name,'.$id.',id,deleted_at,NULL'],
            'brand_image_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'status' => ['min:0', 'max:1'],
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
