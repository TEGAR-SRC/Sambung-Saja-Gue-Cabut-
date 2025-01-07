<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\AttributeValue;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class AttributeValueRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'value' => 'like',
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
        return AttributeValue::class;
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
        $attributeValue = $this->model->create([
            'attribute_id'=> $request->attribute_id,
            'value' => $request->value
        ]);

        return $attributeValue;
    }

    public function update($request, $id)
    {
        try {

            $attributeValue = $this->model->findOrFail($id);
            $attributeValue->update($request);

            return $attributeValue;

        } catch (Exception $e){

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
}
