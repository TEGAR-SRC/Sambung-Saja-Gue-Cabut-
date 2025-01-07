<?php

namespace App\Http\Controllers;

use Exception;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use App\Models\LicenseKey;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Http\Requests\CreateLicenseKeyRequest;
use App\Repositories\Eloquents\LicenseKeyRepository;

class LicenseKeyController extends Controller
{
    public $repository;

    public function __construct(LicenseKeyRepository $repository)
    {
        $this->authorizeResource(LicenseKey::class,'license_key');
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {

            $licenseKey = $this->filter($this->repository, $request);
            return $licenseKey->latest('created_at')->paginate($request->paginate ?? $licenseKey->count());

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateLicenseKeyRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(LicenseKey $licenseKey)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LicenseKey $licenseKey)
    {
        return $this->repository->show($licenseKey->id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LicenseKey $licenseKey)
    {
        return $this->repository->update($request->all(), $licenseKey->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, LicenseKey $licenseKey)
    {
        return $this->repository->destroy($licenseKey->getId($request));
    }

    /**
     * Update Status the specified resource from storage.
     *
     * @param  int  $id
     * @param int $status
     * @return \Illuminate\Http\Response
     */
    public function status(Request $request)
    {
        return $this->repository->status($request->id, $request->status);
    }

    public function deleteAll(Request $request)
    {
        return $this->repository->deleteAll($request->ids);
    }

    public function getLicenseKeysExportUrl(Request $request)
    {
        return $this->repository->getLicenseKeysExportUrl($request);
    }

    public function import()
    {
        return $this->repository->import();
    }

    public function export()
    {
        return $this->repository->export();
    }

    public function filter($licenseKeys, $request)
    {
        if (Helpers::isUserLogin()) {
            $roleName = Helpers::getCurrentRoleName();
            if ($roleName == RoleEnum::VENDOR) {
                $store_id = Helpers::getCurrentVendorStoreId();
                $licenseKeys = $licenseKeys->whereHas('product', function (Builder $products) use ($store_id) {
                    $products->where('store_id', $store_id);
                });
            }
        }

        if ($request->field && $request->sort) {
            $licenseKeys = $licenseKeys->orderBy($request->field, $request->sort);
        }

        if (isset($request->status)) {
            $licenseKeys = $licenseKeys->where('status',$request->status);
        }

        return $licenseKeys;
    }
}
