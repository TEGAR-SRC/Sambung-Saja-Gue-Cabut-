<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class UpdateBlogRequest extends FormRequest
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
        $id = $this->route('blog') ? $this->route('blog')->id : $this->id;
        return [
            'title'  => ['nullable', 'max:255', 'unique:blogs,title,'.$id.',id,deleted_at,NULL'],
            'categories' => ['nullable','exists:categories,id,deleted_at,NULL'],
            'blog_thumbnail_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'blog_meta_image_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'tags' => ['nullable','exists:tags,id,deleted_at,NULL'],
            'is_featured' => ['min:0','max:1'],
            'is_sticky' => ['min:0','max:1'],
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
