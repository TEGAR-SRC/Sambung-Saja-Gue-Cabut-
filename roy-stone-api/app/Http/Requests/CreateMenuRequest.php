<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class CreateMenuRequest extends FormRequest
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
            'title'  => ['required', 'string', 'max:255'],
            'parent_id' => ['nullable','exists:menus,id,deleted_at,NULL'],
            'banner_image_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'item_image_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'mega_menu' => ['nullable','min:0','max:1'],
            'product_ids.*' => ['nullable','exists:products,id,deleted_at,NULL'],
            'blog_ids.*' => ['nullable','exists:blogs,id,deleted_at,NULL'],
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()?->first(), 422);
    }
}
