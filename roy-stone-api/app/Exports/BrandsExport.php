<?php

namespace App\Exports;

use App\Models\Brand;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class BrandsExport implements FromQuery, WithMapping, WithHeadings, WithChunkReading, ShouldQueue
{
    use Exportable;

    /**
    * @return \Illuminate\Support\Collection
    */
    public function query()
    {
        $brands = Brand::whereNull('deleted_at')->latest('created_at');
        return $this->filter($brands, request());
    }

    public function chunkSize(): int
    {
        return 500;
    }

    public function columns(): array
    {
        return ["id","name", "slug", "meta_title", "meta_description", "status", "brand_image_url", "brand_banner_url", "brand_meta_image_url", "created_at"];
    }

    public function map($brand): array
    {
        return [
            $brand->id,
            $brand->name,
            $brand->slug,
            $brand->meta_title,
            $brand->meta_description,
            $brand->status,
            $brand->brand_image?->original_url,
            $brand->brand_banner_image?->original_url,
            $brand->brand_meta_image?->original_url,
            $brand->created_at
        ];
    }

    public function headings(): array
    {
        return $this->columns();
    }

    public function filter($brands, $request)
    {
        if ($request->ids) {
            $ids = explode(',',$request->ids);
            $brands = $brands->whereIn('id', $ids);
        }

        if ($request->field && $request->sort) {
           $brands = $brands->orderBy($request->field, $request->sort);
        }

        if (isset($request->status)) {
            $brands = $brands->whereStatus($request->status);
        }

        if ($request->search) {
            $brands = $brands->where('name', 'like', '%'.$request->search.'%');
        }

        return $brands;
    }
}
