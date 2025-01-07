<?php

namespace App\Exports;

use App\Models\Category;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMapping;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class CategoriesExport implements FromQuery, WithMapping, WithHeadings, WithChunkReading, ShouldQueue
{
    use Exportable;

    /**
    * @return \Illuminate\Support\Collection
    */
    public function query()
    {
        return Category::where('type', 'product')->whereNull('deleted_at')->latest('created_at');
    }

    public function chunkSize(): int
    {
        return 500;
    }

    public function columns(): array
    {
        return ["id", "name", "description", "slug", "type", "parent_id", "commission_rate", "status", "category_image_url", "category_icon_url", "created_at"];
    }

    public function map($category): array
    {
        return [
            $category->id,
            $category->name,
            $category->description,
            $category->slug,
            $category->type,
            $category->parent_id,
            $category->commission_rate,
            $category->status,
            $category->category_image?->original_url,
            $category->category_icon?->original_url,
            $category->created_at
        ];
    }

    public function headings(): array
    {
        return $this->columns();
    }
}
