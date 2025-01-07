<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\Brand;
use App\Imports\BrandImport;
use App\Exports\BrandsExport;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class BrandRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'name' => 'like',
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
       return Brand::class;
    }

    public function show($id)
    {
        try {

            return $this->model->findOrFail($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $brand = $this->model->create([
                'name' => $request->name,
                'status' => $request->status,
                'meta_title' => $request->meta_title,
                'meta_description' => $request->meta_description,
                'brand_image_id' => $request->brand_image_id,
                'brand_banner_id' => $request->brand_banner_id,
                'brand_meta_image_id' => $request->brand_meta_image_id,
            ]);

            $brand->brand_image;
            DB::commit();

            $brand = $brand->fresh();
            if ($request->slug) {
                $brand->slug = $request->slug;
                $brand->save();
            }

            return $brand;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $brand = $this->model->findOrFail($id);
            $brand->update($request);
            if (isset($request['brand_image_id'])) {
                $brand->brand_image()->associate($request['brand_image_id']);
            }

            if (isset($request['brand_banner_id'])) {
                $brand->brand_banner()->associate($request['brand_banner_id']);
            }

            if (isset($request['brand_meta_image_id'])) {
                $brand->brand_meta_image()->associate($request['brand_meta_image_id']);
            }

            $brand->brand_image;
            DB::commit();

            $brand = $brand->fresh();
            if (isset($request['slug'])) {
                $brand->slug = $request['slug'];
                $brand->save();
            }

            return $brand;

        } catch (Exception $e) {

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

            $brandImport = new BrandImport();
            Excel::import($brandImport, request()->file('brands'));
            DB::commit();

            return $brandImport->getImportedTags();

        } catch (Exception $e){

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getBrandsExportUrl()
    {
        try {

            return route('brands.export');

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function export()
    {
        try {

            return Excel::download(new BrandsExport, 'brands.csv');

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getBrandBySlug($slug)
    {
        try {

            return $this->model->where('slug', $slug)->firstOrFail();

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
