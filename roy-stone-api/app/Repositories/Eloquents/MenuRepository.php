<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\Menu;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class MenuRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'title' => 'like',
        'child.title' => 'like'
    ];

    public function boot()
    {
        try {

            $this->pushCriteria(app(RequestCriteria::class));

        } catch (ExceptionHandler $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    function model()
    {
       return Menu::class;
    }

    public function show($id)
    {
        try {

            return $this->model->with('child')->findOrFail($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $menu = $this->model->create([
                'title' => $request->title,
                'link_type' => $request->link_type,
                'path' => $request->path,
                'sort' => $request->sort,
                'slug' => $request->slug,
                'path' => $request->path,
                'type' => $request->type,
                'set_page_link' => $request->set_page_link,
                'mega_menu' => $request->mega_menu,
                'mega_menu_type' => $request->mega_menu_type,
                'badge_text' => $request->badge_text,
                'badge_type' => $request->badge_type,
                'parent_id' => $request->parent_id,
                'item_image_id' => $request->item_image_id,
                'is_target_blank' => $request->is_target_blank,
                'banner_image_id'   => $request->banner_image_id,
            ]);

            $menu->item_image;
            $menu->banner_image;

            if (isset($request->product_ids)){
                $menu->products()->attach($request->product_ids);
            }

            if (isset($request->blog_ids)){
                $menu->blogs()->attach($request->blog_ids);
            }

            DB::commit();
            return $menu;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $menu = $this->model->findOrFail($id);
            $menu->update($request);

            if (isset($request['product_ids'])){
                $menu->products()->sync($request['product_ids']);
            }

            if (isset($request['blog_ids'])){
                $menu->blogs()->sync($request['blog_ids']);
            }

            DB::commit();
            return $menu;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function status($id, $status)
    {
        try {

            $menu = $this->model->findOrFail($id);
            $menu->update(['status' => $status]);

            return $menu;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function updateMenuPosition($item)
    {
        if ($item['id']) {
            $menu = $this->model->findOrFail($item['id']);
            $menu->update([
                'sort' => $item['sort']
            ]);
        }

        if (count($item['child'])) {
            foreach ($item['child'] as $child) {
                $this->updateMenuPosition($child);
            }
        }

        return $menu;
    }

    public function sort($request)
    {
        DB::beginTransaction();
        try {

            $menus = $request->menus;
            foreach ($menus as $menu) {
                $this->updateMenuPosition($menu);
            }

            DB::commit();
            $menus = $this->model->whereNull('parent_id')->orderBy('sort')->with('child')?->paginate();
            return $menus;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function destroy($id)
    {
        try {

            return $this->model->findOrFail($id)?->destroy($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
