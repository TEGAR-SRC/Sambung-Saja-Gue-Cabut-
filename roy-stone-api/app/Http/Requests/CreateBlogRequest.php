<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class CreateBlogRequest extends FormRequest
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
            'title'  => ['required', 'string', 'max:255', 'unique:blogs,title,NULL,id,deleted_at,NULL'],
            'description' => ['nullable', 'min:10'],
            'categories' => ['nullable','required', 'exists:categories,id,deleted_at,NULL'],
            'blog_thumbnail_id' => ['required','exists:attachments,id,deleted_at,NULL'],
            'blog_meta_image_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'tags' => ['nullable','exists:tags,id,deleted_at,NULL'],
            'is_featured' => ['nullable','min:0','max:1'],
            'is_sticky' => ['nullable','min:0','max:1'],
            'status' => ['nullable','required','min:0','max:1'],
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
