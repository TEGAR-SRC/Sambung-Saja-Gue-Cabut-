<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\Attribute;
use App\Imports\AttributeImport;
use App\Exports\AttributesExport;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class AttributeRepository extends BaseRepository
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
        return Attribute::class;
    }

   public function show($id)
   {
        try {

            return $this->model->with('attribute_values')->findOrFail($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
   }

   public function store($request)
   {
        DB::beginTransaction();
        try {

            $attribute = $this->model->create([
                'name' => $request->name,
                'status' => $request->status,
                'style' => $request->style
            ]);

            if (isset($request['value'])) {
                $attributeValues = [];
                foreach ($request['value'] as $attributeValue) {
                    if (isset($attributeValue['value'])) {
                        $attributeValues[] = $attributeValue;
                    }
                }

                $attribute->attribute_values()->createMany($attributeValues);
            }

            $attribute->attribute_values;

            DB::commit();
            return $attribute;

        } catch (Exception $e){

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
   }

   public function update($request, $id)
   {
        DB::beginTransaction();
        try {

            $attribute = $this->model->findOrFail($id);
            $attribute->update($request);

            if (isset ($request['value']) && $attribute) {
                foreach($request['value'] as $attributeValueData) {
                    if (empty($attributeValueData['id']) && isset($attributeValueData['value'])) {
                        $attributeValueIds[] = $attribute->attribute_values()->create($attributeValueData)->id;

                    } else if(isset($attributeValueData['value']) && isset($attributeValueData['id'])) {
                        $attributeValue = $attribute->attribute_values()->findOrFail($attributeValueData['id']);
                        $attributeValueIds[] = $attributeValueData['id'];
                        $attributeValue->update($attributeValueData);
                    }
                }

                $attribute->attribute_values()->whereNotIn('id',$attributeValueIds)->delete();
                $attribute->attribute_values;
            }

            DB::commit();
            return $attribute;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
   }

   public function destroy($id)
   {
        try {

            return $this->model->findOrFail($id)->delete($id);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function status($id, $status)
    {
        try {

            $attribute = $this->model->findOrFail($id);
            $attribute->update(['status' => $status]);

            return $attribute;

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

            $attributeImport = new AttributeImport();
            Excel::import($attributeImport, request()->file('attributes'));
            DB::commit();

            return $attributeImport->getImportedAttributes();

        } catch (Exception $e){

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getAttributesExportUrl()
    {
        try {

            return route('attributes.export');

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function export()
    {
        try {

            return Excel::download(new AttributesExport, 'attributes.csv');

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
