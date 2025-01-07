<?php

namespace App\Http\Controllers;

use App\Models\Notice;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\Repositories\Eloquents\NoticeRepository;

class NoticeController extends Controller
{
    public $repository;

    public function __construct(NoticeRepository $repository)
    {
        $this->authorizeResource(Notice::class,'notice');
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $notices = $this->filter($this->repository, $request);
        return $notices->latest('updated_at')->paginate($request->paginate ?? $notices->count());
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
    public function store(Request $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Notice $notice)
    {
        return $this->repository->show($notice->id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Notice $notice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Notice $notice)
    {
        return $this->repository->update($request->all(), $notice->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Notice $notice)
    {
        return $this->repository->destroy($notice->getId($request));
    }

    public function deleteAll(Request $request)
    {
        return $this->repository->deleteAll($request->ids);
    }

    public function markAsRead(Request $request)
    {
        return $this->repository->markAsRead($request->id);
    }

    public function recentNotice()
    {
        return $this->repository->recentNotice();
    }

    public function filter($notices, $request)
    {
        if (Helpers::isUserLogin()) {
            $roleName = Helpers::getCurrentRoleName();
            $user_id = Helpers::getCurrentUserId();
            if ($roleName == RoleEnum::VENDOR) {
                $notices = $notices->whereHas('reader',  function (Builder $vendors) use($user_id) {
                    $vendors->where('user_id', $user_id);
                });
            }
        }

        if ($request->field && $request->sort) {
            $notices = $notices->orderBy($request->field, $request->sort);
        }

        return $notices;
    }
}
