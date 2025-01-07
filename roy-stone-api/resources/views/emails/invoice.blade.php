@use('App\Helpers\Helpers')
@php
$currencyCode = Helpers::getDefaultCurrencyCode();
$currencySymbol = ($currencyCode == 'INR') ? "Rs." : Helpers::getDefaultCurrencySymbol();
@endphp
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>{{ $settings['general']['site_title'] }}</title>
</head>
<style type="text/css">
    body {
        font-family: 'Roboto Condensed', sans-serif;
    }

    .m-0 {
        margin: 0px;
    }

    .p-0 {
        padding: 0px;
    }

    .pt-5 {
        padding-top: 5px;
    }

    .mt-10 {
        margin-top: 10px;
    }

    .text-center {
        text-align: center !important;
    }

    .w-100 {
        width: 100%;
    }

    .w-50 {
        width: 50%;
    }

    .w-85 {
        width: 85%;
    }

    .w-15 {
        width: 15%;
    }

    .logo img {
        width: 200px;
        height: 60px;
    }

    .gray-color {
        color: #52a750a4;
    }

    .text-bold {
        font-weight: bold;
    }

    .border {
        border: 1px solid black;
    }

    table tr,
    th,
    td {
        border: 1px solid #d2d2d2;
        border-collapse: collapse;
        padding: 7px 8px;
    }

    table tr th {
        background: #F4F4F4;
        font-size: 15px;
    }

    table tr td {
        font-size: 13px;
    }

    table {
        border-collapse: collapse;
    }

    .box-text p {
        line-height: 10px;
    }

    .float-left {
        float: left;
    }

    .float-right {
        float: right;
    }

    .total-part {
        font-size: 16px;
        line-height: 12px;
    }

    .total-right p {
        padding-right: 20px;
    }
</style>

<body>
    <div class="head-title">
        <h1 class="text-center m-0 p-0">{{ env('APP_NAME') }} - Invoice</h1>
    </div>
    <div class="add-detail mt-10">
        <div class="w-50 float-left mt-10">
            <p class="m-0 pt-5 text-bold w-100">Name - <span class="gray-color">{{$order->consumer['name']}}</span></p>
            <p class="m-0 pt-5 text-bold w-100">Email - <span class="gray-color">{{$order->consumer['email']}}</span></p>
            <p class="m-0 pt-5 text-bold w-100">Phone. - <span class="gray-color">(+{{$order->consumer['country_code']}}) - {{$order->consumer['phone']}}</span></p>
        </div>

        <div class="w-50 float-right mt-10">
            <p class="m-0 pt-5 text-bold w-100">Order Numb. - <span class="gray-color">{{$order->order_number}}</span></p>
            <p class="m-0 pt-5 text-bold w-100">Order Date - <span class="gray-color">{{$order->created_at->format("d/m/Y")}}</span></p>
            <p class="m-0 pt-5 text-bold w-100">Payment Method - <span class="gray-color">{{$order->payment_method}}</span></p>
        </div>
        <div style="clear: both;"></div>
    </div>
    <div class="table-section bill-tbl w-100 mt-10">
        <table class="table w-100 mt-10">
            <tr>
                <th class="w-50">Billing Address</th>
                @if (!$order->is_digital_only)
                <th class="w-50">Shipping Address</th>
                @endif
            </tr>
            <tr>
                <td>
                    <div class="box-text">
                        <p>{{$order->billing_address['street']}}</p>
                        <p>{{$order->billing_address['pincode']}},</p>
                        <p>{{$order->billing_address['city']}},</p>
                        @if (isset($order->billing_address['state']) && isset($order->billing_address['country']))
                            <p>{{$order->billing_address['state']['name']}}, {{$order->billing_address['country']['name']}}</p>
                        @endif
                        <p>Contact: ({{$order->billing_address['country_code']}}) {{$order->billing_address['phone']}}</p>
                    </div>
                </td>
                @if (!$order->is_digital_only)
                <p>{{$order->shipping_address['street']}}</p>
                <p>{{$order->shipping_address['pincode']}},</p>
                <p>{{$order->shipping_address['city']}},</p>
                @if (isset($order->shipping_address['state']) && isset($order->shipping_address['country']))
                    <p>{{$order->shipping_address['state']['name']}}, {{$order->shipping_address['country']['name']}}</p>
                @endif
                <p>Contact: ({{$order->shipping_address['country_code']}}) {{$order->shipping_address['phone']}}</p>
                @endif
            </tr>
        </table>
    </div>
    <div class="table-section bill-tbl w-100 mt-10">
        <table class="table w-100 mt-10">
            <tr>
                <th class="w-50">No</th>
                <th class="w-50">Product Name</th>
                <th class="w-50">Price</th>
                <th class="w-50">Qty</th>
                <th class="w-50">Subtotal</th>
                <th class="w-50">Shipping Cost</th>
                <th class="w-50">Grand Total</th>
            </tr>
            @foreach ($order->products as $no => $product)
            <tr align="center">
                <td>{{++$no}}</td>
                <td>{{$product->name}}</td>
                <td>{{$currencySymbol}} {{$product->pivot->single_price}}</td>
                <td>{{$product->pivot->quantity}}</td>
                <td>{{$currencySymbol}} {{$product->pivot->subtotal}}</td>
                <td>{{$currencySymbol}} {{$product->pivot->shipping_cost}}</td>
                <td>{{$currencySymbol}} {{$product->pivot->subtotal + $product->pivot->shipping_cost + $product->pivot->tax}}</td>
            </tr>
            @endforeach
            <tr>
                <td colspan="7">
                    <div class="total-part">
                        <div class="total-left w-85 float-left" align="right">
                            <p>Sub Total</p>
                            <p>Tax</p>
                            <p>Shipping</p>
                            <p>Total Payable</p>
                        </div>
                        <div class="total-right w-15 float-left text-bold" align="right">
                            <p>{{$currencySymbol}} {{$order->amount}}</p>
                            <p>{{$currencySymbol}} {{$order->tax_total}}</p>
                            <p>{{$currencySymbol}} {{$order->shipping_total}}</p>
                            <p>{{$currencySymbol}} {{$order->total}}</p>
                        </div>
                        <div style="clear: both;"></div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</html>
