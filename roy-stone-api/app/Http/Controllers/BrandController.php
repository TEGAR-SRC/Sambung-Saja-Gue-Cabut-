<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use App\Http\Requests\CreateBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Repositories\Eloquents\BrandRepository;

class BrandController extends Controller
{
    public $repository;

    public function __construct(BrandRepository $repository)
    {
        $this->authorizeResource(Brand::class, 'brand', [
            'except' => [ 'index', 'show' ],
        ]);

        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $brands = $this->filter($this->repository, $request);
        return $brands->latest('created_at')->paginate($request->paginate ?? $this->repository->count());
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
    public function store(CreateBrandRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        return $this->repository->show($brand->id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        return $this->repository->update($request->all(), $brand->getId($request));
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,  Brand $brand)
    {
        return $this->repository->destroy($brand->getId($request));
    }

    public function deleteAll(Request $request)
    {
        return $this->repository->deleteAll($request->ids);
    }

    public function getBrandsExportUrl(Request $request)
    {
        return $this->repository->getBrandsExportUrl($request);
    }

    public function import()
    {
        return $this->repository->import();
    }

    public function export()
    {
        return $this->repository->export();
    }

    public function getBrandBySlug($slug)
    {
        return $this->repository->getBrandBySlug($slug);
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

        return $brands;
    }
}
