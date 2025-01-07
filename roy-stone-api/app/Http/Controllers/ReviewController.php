<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use Illuminate\Http\Request;
use App\Http\Requests\CreateReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\Repositories\Eloquents\ReviewRepository;

class ReviewController extends Controller
{
    public $repository;

    public function __construct(ReviewRepository $repository)
    {
        $this->authorizeResource(Review::class,'review',[
            'except' => 'edit', 'update', 'destroy'
        ]);

        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $reviews = $this->filter($this->repository->with(['product', 'store']), $request);
        return $reviews->latest('created_at')->paginate($request->paginate ?? $this->repository->count());
    }

    /**
     * Display a listing of the resource.
     */
    public function frontIndex(Request $request)
    {
        $reviews = $this->filter($this->repository, $request);
        return $reviews->latest('created_at')->paginate($request->paginate ?? $this->repository->count());
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
    public function store(CreateReviewRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReviewRequest $request, Review $review)
    {
        return $this->repository->update($request->all(), $review->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Review $review)
    {
        return $this->repository->destroy($review->getId($request));
    }

    public function deleteAll(Request $request)
    {
        return $this->repository->deleteAll($request->ids);
    }

    public function filter($reviews, $request)
    {
        if (Helpers::isUserLogin()) {
            $roleName = Helpers::getCurrentRoleName();
            if ($roleName == RoleEnum::VENDOR) {
                $reviews = $reviews->where('store_id',Helpers::getCurrentVendorStoreId());
            }
        }

        if ($request->product_id) {
            $reviews = $reviews->where('product_id',$request->product_id);
        }

        if ($request->field && $request->sort) {
            $reviews = $reviews->orderBy($request->field, $request->sort);
        }

        return $reviews;
    }
}
