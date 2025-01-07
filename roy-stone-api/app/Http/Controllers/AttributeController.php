<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Attribute;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Http\Requests\CreateAttributeRequest;
use App\Http\Requests\UpdateAttributeRequest;
use App\Repositories\Eloquents\AttributeRepository;

class AttributeController extends Controller
{
    public $repository;

    public function __construct(AttributeRepository $repository)
    {
        $this->authorizeResource(Attribute::class, 'attribute', [
            'except' => [ 'index', 'show' ],
        ]);
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $attribute = $this->filter($this->repository->with(['attribute_values']), $request);
            return $attribute->latest('created_at')->paginate($request->paginate ?? $this->repository->count());

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateAttributeRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Attribute $attribute)
    {
        return $this->repository->show($attribute->id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAttributeRequest $request, Attribute $attribute)
    {
        return $this->repository->update($request->all(), $attribute->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Attribute $attribute)
    {
        return $this->repository->destroy($attribute->getId($request));
    }

    /**
     * Update Status the specified resource from storage.
     *
     * @param  int  $id
     * @param int $status
     * @return \Illuminate\Http\Response
     */
    public function status($id, $status)
    {
        return $this->repository->status($id, $status);
    }

    public function deleteAll(Request $request)
    {
        return $this->repository->deleteAll($request->ids);
    }

    public function getAttributesExportUrl(Request $request)
    {
        return $this->repository->getAttributesExportUrl($request);
    }

    public function import()
    {
        return $this->repository->import();
    }

    public function export()
    {
        return $this->repository->export();
    }

    public function filter($attribute, $request)
    {
        if ($request->field && $request->sort) {
           $attribute = $attribute->orderBy($request->field, $request->sort);
        }

        if (isset($request->status)) {
            $attribute = $attribute->whereStatus($request->status);
        }

        if ($request->store_slug) {
            $store_slug = $request->store_slug;
            $attribute = $attribute->whereHas('products', function (Builder $products) use ($store_slug) {
                $products->whereHas('store', function (Builder $store) use ($store_slug) {
                    $store->where('slug', $store_slug);
                });
            });
        }

        return $attribute;
    }
}
