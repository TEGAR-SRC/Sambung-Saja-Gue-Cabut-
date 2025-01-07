<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class UpdateOrderStatusRequest extends FormRequest
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
        $id = $this->route('orderStatus') ? $this->route('orderStatus')->id : $this->id;
        return [
            'name'  => ['unique:order_status,name,'.$id.',id,deleted_at,NULL','string', 'max:255'],
            'color' => ['string'],
            'sequence' => ['required','unique:order_status,sequence,'.$id.',id,deleted_at,NULL','numeric'],
            'status' => ['min:0','max:1'],
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
