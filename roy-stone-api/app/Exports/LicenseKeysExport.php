<?php

namespace App\Exports;

use App\Models\LicenseKey;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class LicenseKeysExport implements FromQuery, WithMapping, WithHeadings, WithChunkReading, ShouldQueue
{
    use Exportable;

    /**
    * @return \Illuminate\Support\Collection
    */
    public function query()
    {
        return LicenseKey::whereNull('deleted_at')->latest('created_at');
    }

    public function chunkSize(): int
    {
        return 500;
    }

    public function columns(): array
    {
        return ["id", "license_key", "product", "variation", "purchased_name","purchased_email","status", "created_at"];
    }

    public function map($licenseKeys): array
    {
        return [
            $licenseKeys->id,
            $licenseKeys->license_key,
            $licenseKeys->product?->name,
            $licenseKeys->variation?->name,
            $licenseKeys->purchased_by?->name,
            $licenseKeys->purchased_by?->email,
            $licenseKeys->status,
            $licenseKeys->created_at,
        ];
    }

    public function headings(): array
    {
        return $this->columns();
    }
}
