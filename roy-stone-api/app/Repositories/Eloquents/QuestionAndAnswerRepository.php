<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Helpers\Helpers;
use App\Models\QuestionAndAnswer;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class QuestionAndAnswerRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'question' => 'like',
        'answer' => 'like',
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
        return QuestionAndAnswer::class;
    }

    public function show($id)
    {
        try {

            return $this->model->findOrFail($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $questionAndAnswer = $this->model->create([
                'question' => $request->question,
                'answer' => $request->answer,
                'consumer_id' => Helpers::getCurrentUserId(),
                'product_id' => $request->product_id,
                'store_id' => $request->store_id,
            ]);

            DB::commit();
            return $questionAndAnswer;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $questionAndAnswer = $this->model->findOrFail($id);
            $questionAndAnswer->update($request);

            DB::commit();
            return $questionAndAnswer;

        } catch (Exception $e){

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function destroy($id)
    {
        try {

            return $this->model->findOrFail($id)->destroy($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function feedback($request)
    {
        DB::beginTransaction();
        try {

            $questionAndAnswer = $this->model->findOrFail($request->question_and_answer_id);
            $feedback = $questionAndAnswer->feedbacks()->where('consumer_id', Helpers::getCurrentUserId());
            if ($feedback->exists()) {
                $feedback->update([
                    'reaction' => $request->reaction,
                ]);
            } else {
                $questionAndAnswer->feedbacks()->create([
                    'consumer_id' => Helpers::getCurrentUserId(),
                    'reaction' => $request->reaction,
                ]);
            }

            DB::commit();

            $questionAndAnswer = $questionAndAnswer->fresh();
            return $questionAndAnswer;

        } catch (Exception $e){

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}

