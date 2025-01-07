<?php

namespace App\Exports;

use App\Models\Attribute;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMapping;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class AttributesExport implements FromQuery, WithMapping, WithHeadings, WithChunkReading, ShouldQueue
{
    use Exportable;

    /**
    * @return \Illuminate\Support\Collection
    */
    public function query()
    {
        $attributes = Attribute::with('attribute_values')->whereNull('deleted_at')->latest('created_at');
        return $this->filter($attributes, request());
    }

    public function chunkSize(): int
    {
        return 500;
    }

    public function columns(): array
    {
        return ["id","name", "values", "slug", "style", "status", "created_at"];
    }

    public function map($attribute): array
    {
        return [
            $attribute->id,
            $attribute->name,
            $this->getAttributeValues($attribute->attribute_values) ?? [],
            $attribute->slug,
            $attribute->style,
            $attribute->status,
            $attribute->created_at,
        ];
    }

    public function getAttributeValues($attribute_values)
    {
        $formattedAttributeValues = [];
        foreach ($attribute_values as $attribute_value) {
            $formattedAttributeValues[] = [
                'value' => $attribute_value->value,
                'slug' => $attribute_value->slug,
                'hex_color' => $attribute_value->hex_color,
            ];
        }

        return $formattedAttributeValues;
    }

    public function headings(): array
    {
        return $this->columns();
    }

    public function filter($attributes, $request)
    {
        if ($request->field && $request->sort) {
           $attributes = $attributes->orderBy($request->field, $request->sort);
        }

        if (isset($request->status)) {
            $attributes = $attributes->whereStatus($request->status);
        }

        return $attributes;
    }
}
