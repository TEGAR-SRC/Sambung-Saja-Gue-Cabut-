<?php

namespace App\Http\Controllers;

use App\Helpers\Helpers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Eloquents\NotificationRepository;

class NotificationController extends Controller
{
    protected $repository;

    public function __construct(NotificationRepository $repository){
        $this->repository = $repository;
    }

    public function index(Request $request)
    {
        $user = $this->repository->findOrFail(Helpers::getCurrentUserId());
        return $user->notifications()->latest('created_at')->paginate($request->paginate ?? $user->count());
    }

    public function markAsRead(Request $request)
    {
        return $this->repository->markAsRead($request);
    }

    public function destroy(Request $request)
    {
        return $this->repository->destroy($request->id);
    }

    public function test(Request $request)
    {
        return $this->repository->test($request);
    }
}
