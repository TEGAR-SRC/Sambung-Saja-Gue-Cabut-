<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use Illuminate\Http\Request;
use App\Http\Requests\CreateUpdateFaqRequest;
use App\Repositories\Eloquents\FaqRepository;

class FaqController extends Controller
{
    public $repository;

    public function __construct(FaqRepository $repository)
    {
        $this->authorizeResource(Faq::class,'faq', [
            'except' => [ 'index', 'show' ],
        ]);

        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $faqs = $this->filter($this->repository, $request);
        return $faqs->latest('created_at')->paginate($request->paginate ?? $faqs->count());
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
    public function store(CreateUpdateFaqRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Faq $faq)
    {
        return $this->repository->show($faq->id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Faq $faq)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CreateUpdateFaqRequest $request, Faq $faq)
    {
        return $this->repository->update($request->all(), $faq->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Faq $faq)
    {
        return $this->repository->destroy($faq->getId($request));
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

    public function filter($faqs, $request)
    {
        if ($request->field && $request->sort) {
            $faqs = $faqs->orderBy($request->field, $request->sort);
        }

        if (isset($request->status)) {
            $faqs = $faqs->where('status', $request->status);
        }

        return $faqs;
    }
}
