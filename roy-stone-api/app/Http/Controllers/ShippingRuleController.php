<?php

namespace App\Http\Controllers;

use App\Models\ShippingRule;
use Illuminate\Http\Request;
use App\Http\Requests\CreateShippingRuleRequest;
use App\Http\Requests\UpdateShippingRuleRequest;
use App\Repositories\Eloquents\ShippingRuleRepository;

class ShippingRuleController extends Controller
{
    public $repository;

    public function __construct(ShippingRuleRepository $repository)
    {
        $this->authorizeResource(ShippingRule::class, 'shippingRule');
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->repository->latest('created_at')->get();
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
    public function store(CreateShippingRuleRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ShippingRule $shippingRule)
    {
        return $this->repository->show($shippingRule->id);
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
    public function update(UpdateShippingRuleRequest $request, ShippingRule $shippingRule)
    {
        return $this->repository->update($request->all(), $shippingRule->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, ShippingRule $shippingRule)
    {
        return $this->repository->destroy($shippingRule->getId($request));
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
}
