<?php

namespace App\Http\Controllers;

use Exception;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use Illuminate\Http\Request;
use App\Models\QuestionAndAnswer;
use App\Http\Requests\FeedbackRequest;
use Illuminate\Database\Eloquent\Builder;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Http\Requests\QuestionAndAnswerRequest;
use App\Repositories\Eloquents\QuestionAndAnswerRepository;

class QuestionAndAnswerController extends Controller
{
    protected $repository;

    public function __construct(QuestionAndAnswerRepository $repository)
    {
        $this->authorizeResource(QuestionAndAnswer::class, 'question_and_answer', [
            'except' => [ 'index', 'show','store','update' ],
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

            $questionAndAnswer = $this->filter($this->repository, $request);
            return $questionAndAnswer->latest('created_at')->paginate($request->paginate ?? $questionAndAnswer->count());

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
    public function store(QuestionAndAnswerRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(QuestionAndAnswer $question_and_answer)
    {
        return $this->repository->show($question_and_answer->id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(QuestionAndAnswer $question_and_answer)
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
    public function update(QuestionAndAnswerRequest $request, QuestionAndAnswer $question_and_answer)
    {
        return $this->repository->update($request->all(), $question_and_answer->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, QuestionAndAnswer $question_and_answer)
    {
        return  $this->repository->destroy($question_and_answer->getId($request));
    }

    public function feedback(FeedbackRequest $request)
    {
        return  $this->repository->feedback($request);
    }

    public function filter($questionAndAnswers, $request)
    {
        $questionAndAnswers = $questionAndAnswers->whereNotNull('answer');
        if ($request->field && $request->sort) {
            $questionAndAnswers = $questionAndAnswers->orderBy($request->field, $request->sort);
        }

        if (Helpers::isUserLogin()) {
            $roleName = Helpers::getCurrentRoleName();
            $questionAndAnswers = $this->repository;
            if ($roleName == RoleEnum::CONSUMER && $request->product_id) {
                $questionAndAnswers = $this->repository->where('consumer_id',Helpers::getCurrentUserId())
                    ->where('product_id',$request->product_id)->orWhereNotNull('answer');
            }

            if ($roleName == RoleEnum::VENDOR) {
                $questionAndAnswers  = $questionAndAnswers->where('store_id', Helpers::getCurrentVendorStoreId());
            }
        }

        if ($request->product_id) {
            $questionAndAnswers = $questionAndAnswers->where('product_id', $request->product_id);
        }

        if ($request->product_slug) {
            $product_slug = $request->product_slug;
            $questionAndAnswers = $questionAndAnswers->whereHas('products', function (Builder $products) use ($product_slug) {
                $products->whereSlug($product_slug);
            });
        }

        if ($request->status) {
            if ($request->status == 'pending') {
                $questionAndAnswers = $questionAndAnswers->whereNull('answer');
            } else if ($request->status == 'replied') {
                $questionAndAnswers = $questionAndAnswers->whereNull('answer');
            }
        }

        return $questionAndAnswers;
    }
}
