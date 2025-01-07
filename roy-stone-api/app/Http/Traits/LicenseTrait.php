<?php

namespace App\Http\Traits;

use App\Helpers\Helpers;
use App\Models\LicenseKey;
use App\Enums\ProductType;
use Illuminate\Support\Str;

trait LicenseTrait
{
  use UtilityTrait;

  public function splitItemBaseType($items)
  {
    $temp = [];
    $digital_items = [];
    $digital_products = [];
    $physical_items = [];
    $physical_products = [];

    if (isset($items['products'])) {
      if (!Helpers::isInSameTypeProducts($items['products'])) {
        foreach ($items['products'] as $product) {
          if ($product['product_type'] == ProductType::DIGITAL) {
            $digital_products[] = $product;
          } else {
            $physical_products[] = $product;
          }
        }

        if (!empty($digital_products)) {
          $_total = [];
          $_tax_total = [];
          $product_type = [];
          $_shipping_total = [];
          foreach ($digital_products as $product) {
            $_tax_total[] = $product['tax'];
            $_shipping_total[] = $product['shipping_cost'];
            $_total[] = $product['subtotal'];
            $product_type[] = $product['product_type'];
            $digital_items['store'] = $product['store_id'];
            $digital_items['products'] = $digital_products;
            $digital_items['total'] = [
              'is_digital_only' => $this->isDigitalOnly($digital_products),
              'tax_total' => $this->formatDecimal(array_sum($_tax_total)),
              'shipping_total' => $this->formatDecimal(array_sum($_shipping_total)),
              'sub_total' => $this->formatDecimal(array_sum($_total)),
              'total' => $this->formatDecimal(array_sum($_tax_total) + array_sum($_shipping_total) + array_sum($_total)),
            ];
          }
          $temp[] = $digital_items;
        }

        if (!empty($physical_products)) {
          $_total = [];
          $_tax_total = [];
          $product_type = [];
          $_shipping_total = [];
          foreach ($physical_products as $product) {
            $_tax_total[] = $product['tax'];
            $_shipping_total[] = $product['shipping_cost'];
            $_total[] = $product['subtotal'];
            $product_type[] = $product['product_type'];
            $physical_items['store'] = $product['store_id'];
            $physical_items['products'] = $physical_products;
            $physical_items['total'] = [
              'is_digital_only' => $this->isDigitalOnly($physical_products),
              'tax_total' => $this->formatDecimal(array_sum($_tax_total)),
              'shipping_total' => $this->formatDecimal(array_sum($_shipping_total)),
              'sub_total' => $this->formatDecimal(array_sum($_total)),
              'total' => $this->formatDecimal(array_sum($_tax_total) + array_sum($_shipping_total) + array_sum($_total)),
            ];
          }

          $temp[] = $physical_items;
        }

        return $temp;
      }
    }
  }

  public function assignLicenseKey($order, $item)
  {
    if (Helpers::isAutoGenerateLicense($item)) {
      return $this->createLicenseKey($order, $item);
    }

    return $this->selectLicenseKey($order, $item);
  }

  public function getRandomLicenseKey($item)
  {
    return LicenseKey::where('product_id', $item['product_id'] ?? null)
      ->where('variation_id', $item['variation_id'] ?? null)
      ->whereNull('deleted_at')
      ->whereNull('purchased_by_id')?->inRandomOrder()?->first();
  }

  public function selectLicenseKey($order, $item)
  {
    $licenseKey = $this->getRandomLicenseKey($item);
    if ($licenseKey) {
      $licenseKey->update([
        'order_id' => $order->id,
        'purchased_by_id' => $order->consumer_id,
        'purchased_at' => $order->created_at
      ]);
    }

    return $licenseKey;
  }

  public function createLicenseKey($order, $item)
  {
    return LicenseKey::create([
      'license_key' => $this->generateUniqueLicenseKey(),
      'product_id' => $item['product_id'] ?? null,
      'variation_id' => $item['variation_id'] ?? null,
      'order_id' => $order->id,
      'purchased_by_id' => $order->consumer_id,
      'purchased_at' => $order->created_at
    ]);
  }

  public function isLicenseKeyExists($license_key)
  {
    return LicenseKey::where('license_key', $license_key)->whereNull('deleted_at')?->exists();
  }

  public function generateUniqueLicenseKey()
  {
    $licenseKey = '';
    do {

      $licenseKey = Str::uuid();
    } while ($this->isLicenseKeyExists($licenseKey));

    return $licenseKey;
  }
}
