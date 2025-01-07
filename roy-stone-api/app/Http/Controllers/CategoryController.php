<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Http\Requests\CreateCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Repositories\Eloquents\CategoryRepository;

class CategoryController extends Controller
{
    public $repository;

    public function __construct(CategoryRepository $repository)
    {
        $this->authorizeResource(Category::class, 'category', [
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

            $categories = $this->repository->whereNull('parent_id')->with('subcategories', 'parent');
            $categories = $this->filter($categories, $request);
            return $categories->oldest('name')->paginate($request->paginate ?? $categories->count());

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
    public function store(CreateCategoryRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        return $this->repository->show($category->id);
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
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        return $this->repository->update($request->all(), $category->getId($request));
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Category $category)
    {
       return $this->repository->destroy($category->getId($request));
    }

    public function getCategoriesExportUrl(Request $request)
    {
        return $this->repository->getCategoriesExportUrl($request);
    }

    public function import()
    {
        return $this->repository->import();
    }

    public function export()
    {
        return $this->repository->export();
    }

    public function getCategoryBySlug($slug)
    {
        return $this->repository->getCategoryBySlug($slug);
    }

    public function filter($categories, $request)
    {
        if ($request->search) {
            $categories = $this->repository->whereNull('deleted_at')->where('name', 'like', '%'.$request->search.'%')?->with('subcategories');
        }

        if ($request->type) {
            $categories = $categories->whereNull('parent_id')->where('type',  $request->type);
        }

        if ($request->ids) {
            $ids = explode(',',$request->ids);
            $categories = $this->repository->with('subcategories')->whereIn('id',$ids);
        }

        if ($request->field && $request->sort) {
            $categories = $categories->orderBy($request->field, $request->sort);
        }

        if (isset($request->status)) {
            $categories = $categories->where('status', $request->status);
        }

        if ($request->store_slug) {
            $store_slug = $request->store_slug;
            $categories = $categories->whereHas('products', function (Builder $products) use ($store_slug) {
                $products->whereHas('store', function (Builder $stores) use ($store_slug) {
                    $stores->where('slug', $store_slug);
                });
            });
        }

        return $categories;
    }
}
