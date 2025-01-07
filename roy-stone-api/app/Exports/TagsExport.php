<?php

namespace App\Exports;

use App\Models\Tag;
use Maatwebsite\Excel\Concerns\FromQuery;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class TagsExport implements FromQuery, WithMapping, WithHeadings, WithChunkReading, ShouldQueue
{
    use Exportable;

    /**
    * @return \Illuminate\Support\Collection
    */
    public function query()
    {
        return Tag::where('type', 'product')->whereNull('deleted_at')->latest('created_at');
    }

    public function chunkSize(): int
    {
        return 500;
    }

    public function columns(): array
    {
        return ["id","name", "description", "type", "slug","status", "created_at"];
    }

    public function map($tag): array
    {
        return [
            $tag->id,
            $tag->name,
            $tag->description,
            $tag->type,
            $tag->slug,
            $tag->status,
            $tag->created_at,
        ];
    }

    public function headings(): array
    {
        return $this->columns();
    }
}
