<?php

namespace App\Imports;

use App\Models\Category;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use App\GraphQL\Exceptions\ExceptionHandler;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class CategoryImport implements ToModel, WithHeadingRow, WithValidation, SkipsOnError
{
    private $categories = [];

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique('categories')->where('type', 'product')->whereNull('deleted_at')],
            'parent_id' => ['nullable','exists:categories,id,deleted_at,NULL'],
            'status' => ['required','min:0','max:1'],
            'commission_rate' => ['nullable', 'regex:/^([0-9]{1,2}){1}(\.[0-9]{1,2})?$/'],
            'type' => ['required','in:post,product']
        ];
    }

    public function customValidationMessages()
    {
        return [
            'commission_rate.regex' => 'Enter commission rate percentage between 0 to 99.99',
            'type.in' => 'Category type can be either post or product',
            'name.unique' => 'name has already been taken.',
            'parent_id.exists' => 'category parent id is not exists',
            'status.required' => 'status field is required',
        ];
    }

    /**
     * @param \Throwable $e
     */
    public function onError(\Throwable $e)
    {
        throw new ExceptionHandler($e->getMessage() , 422);
    }

    public function getImportedCategories()
    {
        return $this->categories;
    }

    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $category = new Category([
            'name' =>  $row['name'],
            'description' => $row['description'],
            'type' => $row['type'],
            'status' => $row['status'],
            'commission_rate' => $row['commission_rate'],
            'parent_id' => $row['parent_id']
        ]);

        if (isset($row['category_image_url'])) {
            $media = $category->addMediaFromUrl($row['category_image_url'])->toMediaCollection('attachment');
            $media->save();
            $category->category_image_id = $media->id;
            $category->save();
        }

        if (isset($row['category_icon_url'])) {
            $media = $category->addMediaFromUrl($row['category_icon_url'])->toMediaCollection('attachment');
            $media->save();
            $category->category_icon_id = $media->id;
            $category->save();
        }

        $category = $category->fresh();
        $this->categories[] = [
            'id' => $category->id,
            'name' =>  $category->name,
            'description' => $category->description,
            'type' => $category->type,
            'status' => $category->status,
            'commission_rate' => $category->commission_rate,
            'parent_id' => $category->parent_id,
            'category_image' => $category->category_image,
            'category_icon' => $category->category_icon
        ];

        return $category;
    }
}
