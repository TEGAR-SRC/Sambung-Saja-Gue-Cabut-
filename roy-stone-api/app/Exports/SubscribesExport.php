<?php

namespace App\Exports;

use App\Models\Subscribe;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class SubscribesExport implements FromQuery, WithMapping, WithHeadings, WithChunkReading, ShouldQueue
{
    use Exportable;

    /**
    * @return \Illuminate\Support\Collection
    */
    public function query()
    {
        return Subscribe::whereNull('deleted_at')->latest('created_at');
    }

    public function chunkSize(): int
    {
        return 500;
    }

    public function columns(): array
    {
        return ["id","email","created_at"];
    }

    public function map($tag): array
    {
        return [
            $tag->id,
            $tag->email,
            $tag->created_at,
        ];
    }

    public function headings(): array
    {
        return $this->columns();
    }
}
