<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Page;
use Illuminate\Http\Request;
use App\Http\Requests\CreatePageRequest;
use App\Http\Requests\UpdatePageRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Repositories\Eloquents\PageRepository;

class PageController extends Controller
{
    public $repository;

    public function __construct(PageRepository $repository)
    {
        $this->authorizeResource(Page::class,'page', [
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

            $pages = $this->filter($this->repository->with('created_by'), $request);
            return $pages->latest('created_at')->paginate($request->paginate ?? $pages->count());

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

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreatePageRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Page $page)
    {
        return $this->repository->show($page->id);
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
    public function update(UpdatePageRequest $request, Page $page)
    {
        return $this->repository->update($request->all(), $page->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Page $page)
    {
        return $this->repository->destroy($page->getId($request));
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

    public function getPagesBySlug($slug)
    {
        return $this->repository->getPagesBySlug($slug);
    }

    public function filter($pages, $request)
    {
        if ($request->field && $request->sort) {
            $pages = $pages->orderBy($request->field, $request->sort);
        }

        if (isset($request->status)) {
            $pages = $pages->where('status',$request->status);
        }

        return $pages;
    }
}
