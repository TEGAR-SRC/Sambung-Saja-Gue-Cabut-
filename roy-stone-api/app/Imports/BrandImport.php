<?php

namespace App\Imports;

use App\Models\Brand;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use App\GraphQL\Exceptions\ExceptionHandler;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class BrandImport implements ToModel, WithHeadingRow, WithValidation, SkipsOnError
{
    private $brands = [];

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:brands,name,NULL,id,deleted_at,NULL'],
            'status' => ['required', 'min:0','max:1']
        ];
    }

    public function customValidationMessages()
    {
        return [
            'name.unique' => 'name has already been taken.',
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

    public function getImportedTags()
    {
        return $this->brands;
    }

    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $brand = new Brand([
            'name' =>  $row['name'],
            'status' => $row['status'],
        ]);

        if (isset($row['brand_image_url'])) {
            $media = $brand->addMediaFromUrl($row['brand_image_url'])->toMediaCollection('attachment');
            $media->save();
            $brand->brand_image_id = $media->id;
            $brand->save();
        }

        if (isset($row['brand_meta_image_url'])) {
            $media = $brand->addMediaFromUrl($row['brand_meta_image_url'])->toMediaCollection('attachment');
            $media->save();
            $brand->brand_meta_image_id = $media->id;
            $brand->save();
        }

        if (isset($row['brand_banner_url'])) {
            $media = $brand->addMediaFromUrl($row['brand_banner_url'])->toMediaCollection('attachment');
            $media->save();
            $brand->brand_banner_id = $media->id;
            $brand->save();
        }

        $brand->save();
        $brand = $brand->fresh();

        $this->brands[] = [
            'id' => $brand->id,
            'name' =>  $brand->name,
            'status' => $brand->status,
            'meta_title' => $brand->meta_title,
            'meta_description' => $brand->meta_description,
            'brand_image' => $brand->brand_image,
            'brand_meta_image' => $brand->brand_meta_image,
        ];

        return $brand;
    }
}
