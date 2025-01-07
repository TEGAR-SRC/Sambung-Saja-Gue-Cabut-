<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Helpers\Helpers;
use App\Models\LicenseKey;
use App\Imports\LicenseKeyImport;
use Illuminate\Support\Facades\DB;
use App\Exports\LicenseKeysExport;
use Maatwebsite\Excel\Facades\Excel;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class LicenseKeyRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'license_key' => 'like',
        'purchased_by.name' => 'like',
        'product.name' => 'like',
    ];

    public function boot()
    {
        try {

            $this->pushCriteria(app(RequestCriteria::class));

        } catch (ExceptionHandler $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    function model()
    {
        return LicenseKey::class;
    }

    public function show($id)
    {
        try {

            return $this->model->findOrFail($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function verifyIsDigitalItem($request)
    {
        if (Helpers::isDigitalProduct($request->product_id)) {
            return true;
        }

        throw new Exception("Provided product id isn't for a digital product.", 422);
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $license_keys = [];
            if ($this->verifyIsDigitalItem($request)) {
                foreach($request->license_keys as $license_key) {
                    $license_keys[] = $this->model->create([
                        'license_key' => $license_key,
                        'product_id' => $request->product_id,
                        'variation_id' => $request->variation_id
                    ]);
                }
            }

            DB::commit();
            return $license_keys;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $license_keys = $this->model->findOrFail($id);
            $license_keys->update($request);

            DB::commit();
            return $license_keys;

        } catch (Exception $e){

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function destroy($id)
    {
        try {

            return $this->model->findOrFail($id)->destroy($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function status($id, $status)
    {
        try {

            $tag = $this->model->findOrFail($id);
            $tag->update(['status' => $status]);

            return $tag;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function deleteAll($ids)
    {
        try {

            return $this->model->whereIn('id', $ids)->delete();

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function import()
    {
        DB::beginTransaction();
        try {

            $licenseKeyImport = new LicenseKeyImport();
            Excel::import($licenseKeyImport, request()->file('license_keys'));
            DB::commit();

            return $licenseKeyImport->getImportedLicenseKeys();

        } catch (Exception $e){

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getLicenseKeysExportUrl()
    {
        try {

            return route('license_keys.export');

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function export()
    {
        try {

            return Excel::download(new LicenseKeysExport, 'license_keys.csv');

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}






