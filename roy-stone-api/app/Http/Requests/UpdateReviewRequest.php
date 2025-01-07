<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class UpdateReviewRequest extends FormRequest
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
        return [
            'product_id' => ['nullable','exists:products,id,deleted_at,NULL'],
            'store_id' => ['nullable','exists:stores,id,deleted_at,NULL'],
            'review_image_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'description' => ['nullable','string'],
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
