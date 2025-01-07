<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AttributeValue;
use App\Http\Requests\CreateAttributeValueRequest;
use App\Http\Requests\UpdateAttributeValueRequest;
use App\Repositories\Eloquents\AttributeValueRepository;

class AttributeValueController extends Controller
{

    public $repository;

    public function __construct(AttributeValueRepository $repository)
    {
        $this->authorizeResource(AttributeValue::class,'attributeValue', [
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
        $attribute_values = $this->repository->latest('created_at');
        return $attribute_values->paginate($request->paginate ?? $attribute_values->count());
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
    public function store(CreateAttributeValueRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(AttributeValue $attributeValue)
    {
        return $this->repository->show($attributeValue->id);
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
    public function update(UpdateAttributeValueRequest $request, AttributeValue $attributeValue)
    {
        return $this->repository->update($request->all(), $attributeValue->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, AttributeValue $attributeValue)
    {
        return $this->repository->destroy($attributeValue->getId($request));
    }
}
