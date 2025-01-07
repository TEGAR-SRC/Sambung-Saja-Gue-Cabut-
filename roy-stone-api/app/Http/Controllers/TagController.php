<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use App\Http\Requests\CreateTagRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Repositories\Eloquents\TagRepository;

class TagController extends Controller
{
    public $repository;

    public function __construct(TagRepository $repository)
    {
        $this->authorizeResource(Tag::class,'tag', [
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
        $tags = $this->filter($this->repository, $request);
        return $tags->latest('created_at')->paginate($request->paginate ?? $tags->count());
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
    public function store(CreateTagRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Tag $tag)
    {
        return $this->repository->show($tag->id);
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
    public function update(UpdateTagRequest $request, Tag $tag)
    {
        return $this->repository->update($request->all(), $tag->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Tag $tag)
    {
        return $this->repository->destroy($tag->getId($request));
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

    public function getTagsExportUrl(Request $request)
    {
        return $this->repository->getTagsExportUrl($request);
    }

    public function import()
    {
        return $this->repository->import();
    }

    public function export()
    {
        return $this->repository->export();
    }

    public function filter($tags, $request)
    {
        if ($request->ids) {
            $ids = explode(',',$request->ids);
            $tags = $tags->findWhereIn('id',$ids);
        }

        if ($request->type) {
            $tags = $this->repository->whereType($request->type);
        }

        if ($request->field && $request->sort) {
            $tags = $tags->orderBy($request->field, $request->sort);
        }

        if (isset($request->status)) {
            $tags = $tags->where('status',$request->status);
        }

        return $tags;
    }
}
