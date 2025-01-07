<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Tax;
use Illuminate\Http\Request;
use App\Http\Requests\CreateTaxRequest;
use App\Http\Requests\UpdateTaxRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Repositories\Eloquents\TaxRepository;

class TaxController extends Controller
{
    protected $repository;

    public function __construct(TaxRepository $repository)
    {
        $this->authorizeResource(Tax::class, 'tax', [
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

            $taxes = $this->filter($this->repository, $request);
            return $taxes->latest('created_at')->paginate($request->paginate ?? $taxes->count());

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
    public function store(CreateTaxRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Tax $tax)
    {
        return $this->repository->show($tax->id);
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
    public function update(UpdateTaxRequest $request, Tax $tax)
    {
        return $this->repository->update($request->all(), $tax->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Tax $tax)
    {
        return  $this->repository->destroy($tax->getId($request));
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

    public function filter($taxes, $request)
    {
        if ($request->field && $request->sort) {
            $taxes = $taxes->orderBy($request->field, $request->sort);
        }

        if (isset($request->status)) {
            $taxes = $taxes->where('status',$request->status);
        }

        return $taxes;
    }
}
