<?php

namespace App\Imports;

use App\Models\LicenseKey;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use App\GraphQL\Exceptions\ExceptionHandler;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class LicenseKeyImport implements ToModel, WithHeadingRow, WithValidation, SkipsOnError
{
    private $licenseKeys = [];

    public function rules(): array
    {
        return [
            'license_key' => ['required', 'unique:license_keys,license_key,NULL,id,deleted_at,NULL'],
            'product_id' => ['nullable','exists:products,id,deleted_at,NULL'],
            'variation_id' => ['nullable','exists:variations,id,deleted_at,NULL'],
            'status' => ['min:0','max:1']
        ];
    }

    public function customValidationMessages()
    {
        return [
            'license_key.unique' => 'name has already been taken.',
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

    public function getImportedLicenseKeys()
    {
        return $this->licenseKeys;
    }

    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $licenseKeys = new LicenseKey([
            'license_key' =>  $row['license_key'],
            'product_id' =>  $row['product_id'],
            'variation_id' => $row['variation_id'],
            'status' => $row['status'],
        ]);

        $licenseKeys->save();
        $licenseKeys = $licenseKeys->fresh();

        $this->licenseKeys[] = [
            'id' => $licenseKeys->id,
            'license_key' =>  $licenseKeys->license_key,
            'product_id' => $licenseKeys->product_id,
            'variation_id' => $licenseKeys->variation_id,
            'status' => $licenseKeys->status,
        ];

        return $licenseKeys;
    }
}
