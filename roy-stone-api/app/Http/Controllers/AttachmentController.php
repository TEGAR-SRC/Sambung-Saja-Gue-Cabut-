<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use App\Enums\SortByEnum;
use App\Models\Attachment;
use Illuminate\Http\Request;
use App\Http\Requests\CreateAttachmentRequest;
use App\Repositories\Eloquents\AttachmentRepository;

class AttachmentController extends Controller
{
    public $repository;

    public function __construct(AttachmentRepository $repository)
    {
        $this->authorizeResource(Attachment::class, 'attachment', [
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
        $attachments = $this->filter($this->repository, $request);
        return $attachments->latest('created_at')->paginate($request->paginate ?? $this->repository->count());
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
    public function store(CreateAttachmentRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->repository->show($id);
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
    public function update(Request $request, Attachment $attachment)
    {
        return $this->repository->update($request->all(), $attachment->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Attachment $attachment)
    {
        return $this->repository->destroy($attachment->getId($request));
    }

    public function deleteAll(Request $request)
    {
        return $this->repository->deleteAll($request->ids);
    }

    public function filter($attachments, $request)
    {
        $roleName = Helpers::getCurrentRoleName();
        if ($roleName == RoleEnum::VENDOR || $roleName == RoleEnum::CONSUMER) {
            $attachments = $this->repository->where('created_by_id', Helpers::getCurrentUserId());
        }

        if ($request->sort) {
            $attachments = $this->sort($attachments,$request->sort);
        }

        if ($request->mime_type) {
            $mime_types = explode(',',$request->mime_type);
            $attachments = $attachments->whereIn('mime_type', $mime_types);
        }

        return $attachments;
    }

    public function sort($attachment, $sort)
    {
        switch ($sort) {
            case SortByEnum::NEWEST:
                return $attachment->latest('created_at');

            case SortByEnum::OLDEST:
                return $attachment->oldest('updated_at');

            case SortByEnum::SMALLEST:
                return $attachment->orderBy('size','asc');

            case SortByEnum::LARGEST:
                return $attachment->orderBy('size','desc');

            default:
                return $attachment;
        }
    }
}
