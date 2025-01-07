<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\Blog;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class BlogRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'title' => 'like',
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
        return Blog::class;
    }

    public function show($id)
    {
        try {

            $blog = $this->model
                ->with('created_by')->get()
                ->makeVisible(['content', 'meta_description'])
                ->find($id);

            isset($blog->created_by)?
                $blog->created_by->makeHidden(['permission']): $blog;

            return $blog;

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $blog =  $this->model->create([
                'title' => $request->title,
                'description'=> $request->description,
                'content' => $request->content,
                'blog_thumbnail_id'=> $request->blog_thumbnail_id,
                'blog_meta_image_id'=> $request->blog_meta_image_id,
                'meta_title' => $request->meta_title,
                'meta_description' => $request->meta_description,
                'is_featured' => $request->is_featured,
                'is_sticky' => $request->is_sticky,
                'status' => $request->status,
            ]);

            $blog->blog_thumbnail;
            $blog->blog_meta_image;
            if (isset($request->categories)){
                $blog->categories()->attach($request->categories);
                $blog->categories;
            }

            if (isset($request->tags)){
                $blog->tags()->attach($request->tags);
                $blog->tags;
            }

            isset($blog->created_by)?
                $blog->created_by->makeHidden(['permission']): $blog;

            DB::commit();
            return $blog;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $blog = $this->model->findOrFail($id);
            $blog->update($request);

            if (isset($request['blog_thumbnail_id'])) {
                $blog->blog_thumbnail()->associate($request['blog_thumbnail_id']);
                $blog->blog_thumbnail;
            }

            if (isset($request['categories'])){
                $blog->categories()->sync($request['categories']);
                $blog->categories;
            }

            if (isset($request['tags'])){
                $blog->tags()->sync($request['tags']);
                $blog->tags;
            }

            isset($blog->created_by)?
                $blog->created_by->makeHidden(['permission']): $blog;

            DB::commit();
            $blog = $blog->fresh();

            return $blog;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function destroy($id)
    {
        try {

            return $this->model->findOrFail($id)->destroy($id);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function status($id, $status)
    {
        try {

            $blog = $this->model->findOrFail($id);
            $blog->update(['status' => $status]);

            return $blog;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function deleteAll($ids)
    {
        try {

            return $this->model->whereIn('id', $ids)->delete();

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getBlogBySlug($slug)
    {
        try {

            $blog = $this->model->where('slug', $slug)->firstOrFail()
                ->makeVisible(['content', 'meta_description']);

            isset($blog->created_by)?
                $blog->created_by->makeHidden(['permission']): $blog;

            return $blog;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
