<?php

namespace App\Http\Controllers;

use Exception;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use Illuminate\Http\Request;
use App\Models\DownloadFile;
use App\Http\Requests\DownloadZipRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Repositories\Eloquents\DownloadRepository;

class DownloadController extends Controller
{
    public $repository;

    public function __construct(DownloadRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {

            $downloadFiles = $this->filter($this->repository, $request);
            return $downloadFiles->latest('created_at')->paginate($request->paginate ?? $downloadFiles->count());

        }  catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function downloadZipLink(Request $request)
    {
        return $this->repository->downloadZipLink($request);
    }

    public function downloadZip(Request $request)
    {
        return $this->repository->downloadZip($request);
    }

    public function adminDownloadZipLink(DownloadZipRequest $request)
    {
        return $this->repository->adminDownloadZipLink($request);
    }

    public function adminDownloadZip(Request $request)
    {
        return $this->repository->adminDownloadZip($request);
    }

    public function downloadKeyLink(Request $request)
    {
        return $this->repository->downloadKeyLink($request);
    }

    public function downloadKey(Request $request)
    {
        return $this->repository->downloadKey($request);
    }

    public function filter($downloadFiles, $request)
    {
        $roleName = Helpers::getCurrentRoleName();
        if ($roleName == RoleEnum::CONSUMER) {
            $downloadFiles = $downloadFiles->where('consumer_id', Helpers::getCurrentUserId());
        }

        if ($request->field && $request->sort) {
            $downloadFiles = $downloadFiles->orderBy($request->field, $request->sort);
        }

        return $downloadFiles;
    }
}
