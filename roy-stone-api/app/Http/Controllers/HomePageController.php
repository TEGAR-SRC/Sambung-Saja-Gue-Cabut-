<?php

namespace App\Http\Controllers;

use App\Helpers\Helpers;
use App\Models\HomePage;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateHomePageRequest;
use App\Repositories\Eloquents\HomePageRepository;

class HomePageController extends Controller
{
    public $repository;

    public function __construct(HomePageRepository $repository)
    {
        $this->authorizeResource(HomePage::class, 'homePage', [
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
        return $this->filter($this->repository, $request);
    }

     /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(HomePage $homePage)
    {

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
    public function update(UpdateHomePageRequest $request, HomePage $homePage)
    {
        return $this->repository->update($request->all(), $homePage->getId($request));
    }

     /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, HomePage $homePage)
    {

    }

    public function filter($homePage, $request)
    {
        $slug = Helpers::getActiveTheme();
        $homePage = $homePage->where('slug', $slug);
        if (isset($request->slug)) {
            $homePage= $this->repository->where('slug', $request->slug);
        }

        return $homePage->first();
    }
}
