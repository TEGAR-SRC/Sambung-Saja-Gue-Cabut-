<?php

namespace App\Http\Controllers;

use Exception;
use App\Helpers\Helpers;
use App\Http\Traits\WalletPointsTrait;
use App\Http\Requests\WalletPointsRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Http\Requests\CreditDebitPointsRequest;
use App\Repositories\Eloquents\PointsRepository;

class PointsController extends Controller
{
    use WalletPointsTrait;

    public $repository;

    public function __construct(PointsRepository $repository)
    {
        return $this->repository = $repository;
    }

    /**
     * Display a Consumer Points Transactions.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(WalletPointsRequest $request)
    {
        try {

            return $this->filter($this->repository, $request);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Credit Amount from Consumer Points.
     *
     * @return \Illuminate\Http\Response
     */
    public function credit(CreditDebitPointsRequest $request)
    {
        return $this->repository->credit($request);
    }

    /**
     * Debit Amount from Consumer Points.
     *
     * @return \Illuminate\Http\Response
     */
    public function debit(CreditDebitPointsRequest $request)
    {
        return $this->repository->debit($request);
    }

    public function rewardPoints()
    {
        return $this->repository->rewardPoints();
    }

    public function filter($points, $request)
    {
        $consumer_id = $request->consumer_id ?? Helpers::getCurrentUserId();
        $points = $this->repository->where('consumer_id',$consumer_id)->first();

        if (!$points) {
            $points = $this->getPoints($request->consumer_id);
            $points = $points->fresh();
        }

        $transactions = $points->transactions()->where('type', 'LIKE', "%{$request->search}%");
        if ($request->start_date && $request->end_date) {
            $transactions->whereBetween('created_at', [$request->start_date, $request->end_date]);
        }

        $paginate = $request->paginate ?? $points->transactions()->count();
        $points->setRelation('transactions', $transactions->paginate($paginate));

        return $points;
    }
}
