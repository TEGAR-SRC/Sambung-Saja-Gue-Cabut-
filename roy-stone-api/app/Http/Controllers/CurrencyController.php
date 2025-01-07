<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Currency;
use Illuminate\Http\Request;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Http\Requests\CreateCurrencyRequest;
use App\Http\Requests\UpdateCurrencyRequest;
use App\Repositories\Eloquents\CurrencyRepository;

class CurrencyController extends Controller
{
    protected $repository;

    public function __construct(CurrencyRepository $repository)
    {
        $this->authorizeResource(Currency::class, 'currency', [
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

            $currencies = $this->filter($this->repository, $request);
            return $currencies->paginate($request->paginate ?? $currencies->count());

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
    public function store(CreateCurrencyRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Currency $currency)
    {
        return $this->repository->show($currency->id);
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
    public function update(UpdateCurrencyRequest $request, Currency $currency)
    {
        return $this->repository->update($request->all(), $currency->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Currency $currency)
    {
        return  $this->repository->destroy($currency->getId($request));
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

    public function filter($currencies, $request)
    {
        if ($request->field && $request->sort) {
            $currencies = $currencies->orderBy($request->field, $request->sort);
        }

        return $currencies;
    }
}
