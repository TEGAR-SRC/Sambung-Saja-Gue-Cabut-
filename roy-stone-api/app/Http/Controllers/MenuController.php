<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Menu;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateMenuRequest;
use App\Http\Requests\CreateMenuRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Repositories\Eloquents\MenuRepository;

class MenuController extends Controller
{
    public $repository;

    public function __construct(MenuRepository $repository)
    {
        $this->authorizeResource(Menu::class, 'menu', [
            'except' => ['index', 'show'],
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

            $menus = $this->repository->orderBy('sort')->whereNull('parent_id')->with('child');
            $menus = $this->filter($menus, $request);
            return $menus->oldest('created_at')->paginate($request->paginate ?? $menus->count());

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateMenuRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Menu $menu)
    {
        return $this->repository->show($menu->id);
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
     */
    public function update(UpdateMenuRequest $request, $id = null)
    {
        return $this->repository->update($request->all(), $id);
    }
    
    /**
     * Update positions the specified resource in storage.
     */
    public function sort(Request $request)
    {
        return $this->repository->sort($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Menu $menu)
    {
       return $this->repository->destroy($menu->getId($request));
    }

    public function filter($menus, $request)
    {
        if ($request->field && $request->sort) {
            $menus = $menus->orderBy($request->field, $request->sort);
        }

        if (isset($request->status)) {
            $menus = $menus->where('status', $request->status);
        }

        return $menus;
    }
}
