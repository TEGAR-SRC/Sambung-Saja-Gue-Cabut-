<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\Cart;
use App\Helpers\Helpers;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class CartRepository extends BaseRepository
{
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
        return Cart::class;
    }

    public function index($request)
    {
        $cartItems = $this->model->where('consumer_id', Helpers::getCurrentUserId())->latest('created_at')
            ->paginate($request->paginate ?? $this->model->count());

        $cart = $this->getCartTotal($cartItems);
        return $cart;
    }

    public function getCartTotal($cartItems)
    {
        $sub_total = [];
        $cart['items'] = [];
        foreach ($cartItems as $cartItem) {
            $cart['items'][] = $cartItem;
            $sub_total[] = $cartItem->sub_total;
            $cartItem->product;
        }

        $cart['total'] = Helpers::formatDecimal(array_sum($sub_total));
        foreach ($cart['items'] as $item) {
            if (!Helpers::isDigitalProduct($item->product_id)) {
                $cart['is_digital_only'] = 0;
                return $cart;
            }
            $cart['is_digital_only'] = 1;
        }

        return $cart;
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $cartItems[] = $this->verifyCartItem($request->all());
            $cart = $this->getCartTotal($cartItems);

            DB::commit();
            return $cart;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id = null)
    {
        DB::beginTransaction();
        try {

            $cart = $this->verifyCartItem($request);
            if ($cart) {
                $cartItems = $this->model->where('consumer_id', Helpers::getCurrentUserId())->get();
                $cart = $this->getCartTotal($cartItems);
            }

            DB::commit();
            return $cart;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function replace($request)
    {
        DB::beginTransaction();
        try {

            if ($this->isStockAvailable($request, $request->quantity)) {
                $cart = $this->model->findOrFail($request->id);
                $subTotal = Helpers::getSubTotal($request);
                $cart->update([
                    'product_id' => $request->product_id,
                    'variation_id' => $request->variation_id,
                    'quantity' => $request?->quantity,
                    'sub_total' => Helpers::roundNumber($subTotal),
                ]);

                DB::commit();

                $cart = $cart->fresh();
                return $cart;
            }

            throw new Exception("You cannot add more than {$request->quantity} items.", 400);

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function isStockAvailable($product, $quantity)
    {
        $item = Helpers::getProductStock($product['product_id']);
        if (isset($product['variation_id'])) {
            $item = Helpers::getVariationStock($product['variation_id']);
        }

        if ($item) {
            if ($quantity <= $item->quantity && $item->quantity > 0) {
                return true;
            }
        }

        return false;
    }

    public function verifyCartItem($request)
    {
        try {

            $subTotal = Helpers::getSubTotal($request);
            $cart = $this->getCartData($request);

            if ($cart) {
                $quantity = $cart->quantity + $request['quantity'];
                if (!$this->isStockAvailable($request, $quantity)) {
                    throw new Exception("You cannot add more than {$cart->quantity} items.", 400);
                }

                $request['quantity'] = $cart->quantity + $request['quantity'];
                $cart->update([
                    'quantity' =>  $request['quantity'],
                    'sub_total' => Helpers::getSubTotal($request),
                ]);
            } else {
                $cart = $this->model->create([
                    'product_id' => $request['product_id'],
                    'variation_id' => $request['variation_id'],
                    'quantity' => $request['quantity'],
                    'sub_total' => Helpers::formatDecimal($subTotal)
                ]);
            }

            $wholesales = Helpers::isWholesaleProduct($request['product_id']);
            if ($wholesales) {
                if ($cart->sub_total > 0 && $cart->quantity > 0) {
                    $cart->wholesale_price = 0;
                    $per_product_wholesale_price = Helpers::formatDecimal($cart->sub_total / $cart->quantity);
                    foreach ($wholesales as $wholesale) {
                        if (Helpers::isOptimumWholesaleQty($cart->quantity, $wholesale)) {
                            $cart->wholesale_price = $per_product_wholesale_price;
                        }
                    }
                }
            }

            $cart->product;
            $cart->variation;
            $cart->save();

            $cart = $cart->fresh();
            return $cart;

        } catch (Exception $e) {

            throw new Exception($e->getMessage(), $e->getCode());
        }
    }

    public function getCartData($product)
    {
        return $this->model->where([
            ['product_id', $product['product_id']],
            ['variation_id', $product['variation_id']],
            ['consumer_id', Helpers::getCurrentUserId()]
        ])->first();
    }

    public function destroy($id)
    {
        try {

            return $this->model->findOrFail($id)->destroy($id);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function syncCart($request)
    {
        DB::beginTransaction();
        try {

            foreach ($request->all() as $cart) {
                $cartItems[] = $this->verifyCartItem($cart);
                $cart = $this->getCartTotal($cartItems);
            }

            DB::commit();
            return $cart;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function clear()
    {
        try {

            return $this->model->where('consumer_id', Helpers::getCurrentUserId())
                ?->whereNUll('deleted_at')?->delete();

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
