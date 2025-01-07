<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\Order;
use App\Enums\RoleEnum;
use App\Models\Product;
use App\Helpers\Helpers;
use App\Models\Variation;
use App\Models\LicenseKey;
use Illuminate\Support\Str;
use App\Models\DownloadFile;
use Illuminate\Support\Facades\URL;
use Spatie\MediaLibrary\Support\MediaStream;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class DownloadRepository extends BaseRepository
{

    protected $fieldSearchable = [
        'order.order_number' => 'like',
        'product.name' => 'like',
        'variation.name' => 'like',
        'license_key.license_key' => 'like',
    ];

    public function boot()
    {
        try {

            $this->pushCriteria(app(RequestCriteria::class));

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    function model()
    {
        return DownloadFile::class;
    }

    public function generateTemporaryURL($route, $payload)
    {
        return URL::temporarySignedRoute(
            $route,
            now()->addMinutes((int) (env('DOWNLOAD_EXPIRE_TIME') ?? 1)),
            $payload
        );
    }

    public function downloadZipLink($request)
    {
        try {

            $downloadFile = $this->model->where('id', $request->id)->whereNull('deleted_at')?->first();
            if ($this->verifyDownloadFile($downloadFile)) {
                $token = Str::random(13);
                $downloadFile->update([
                    'token' =>  $token,
                ]);

                $payload = ['token' => $token, 'id' => $downloadFile?->id];
                $url = $this->generateTemporaryURL('download.zip.link', $payload);

                return ['download_link' => $url];
            }
        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function adminDownloadZipLink($request)
    {
        try {

            if (Helpers::isDigitalProduct($request->product_id)) {
                $roleName = Helpers::getCurrentRoleName();
                if ($roleName == RoleEnum::CONSUMER) {
                    throw new Exception('unauthorized for consumer.', 400);
                }

                $payload = ['product_id' => $request->product_id, 'variation_id' => $request->variation_id];
                $url = $this->generateTemporaryURL('admin.download.zip.link', $payload);

                return ['download_link' => $url];
            }

            throw new Exception('product is not digital.', 400);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function downloadKeyLink($request)
    {
        try {

            $downloadFile = $this->model->where('id', $request->id)->whereNull('deleted_at')?->first();
            if ($this->verifyDownloadFile($downloadFile)) {
                $product = $this->getLicensableProduct($downloadFile->product_id);
                if ($product) {
                    $token = Str::random(13);
                    $downloadFile->update([
                        'token' =>  $token,
                    ]);

                    $payload = ['token' => $token, 'id' => $downloadFile?->id];
                    $url = $this->generateTemporaryURL('download.key.link', $payload);

                    return ['download_link' => $url];
                }

                throw new Exception('This Product is not licensable', 422);
            }
        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getVariationDigitalFiles($id)
    {
        return Variation::with('digital_files')->where('id', $id)->whereNull('deleted_at')?->first()?->digital_files;
    }

    public function getProductDigitalFiles($id)
    {
        return Product::with('digital_files')->where('id', $id)->whereNull('deleted_at')?->first()?->digital_files;
    }

    public function getLicensableProduct($product_id)
    {
        return Product::where('id', $product_id)->whereNull('deleted_at')?->where('is_licensable', true)->first();
    }

    public function createTextMessageFile($message)
    {
        $fileName = Str::random(13);
        $headers = [
            'Content-type' => 'text/plain',
            'Content-Disposition' => 'attachment; filename=' . $fileName . '.txt',
        ];

        return response()->stream(
            function () use ($message) {
                echo $message;
            },
            200,
            $headers
        );
    }

    public function getRandomLicenseKey($downloadFile)
    {
        return LicenseKey::where('product_id', ($downloadFile?->product_id ?? null))
            ->where('variation_id', ($downloadFile?->variation_id ?? null))
            ->whereNull('deleted_at')
            ->whereNull('purchased_by_id')?->inRandomOrder()?->first();
    }

    public function getPurchasedDetailById($order_id)
    {
        return Order::where('id', $order_id)->whereNull('deleted_at')->first();
    }

    public function generateFileName($request)
    {
        $slug = Product::where('id', $request->product_id)?->whereNull('deleted_at')?->value('slug');
        if ($request->variation_id) {
            $variationName = Variation::where('id', $request->variation_id)?->whereNull('deleted_at')?->value('name');
            $slug = $slug.'-'.$variationName;
        }

        $token = Str::random(18);
        $fileSlug = Str::slug($slug, '-');
        return ($token.'-'.$fileSlug);
    }

    public function adminDownloadZip($request)
    {
        try {

            if ($request->product_id) {
                $files = $this->getProductDigitalFiles($request->product_id);
            }

            if ($request->variation_id) {
                $files = $this->getVariationDigitalFiles($request->variation_id);
            }

            if ($files->isEmpty()) {
                throw new Exception('files not exists.', 404);
            }

            return MediaStream::create("{$this->generateFileName($request)}.zip")->addMedia($files);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function downloadZip($request)
    {
        try {

            $downloadFile = $this->model->where('id', $request->id)?->where('token', $request->token)?->first();
            if ($downloadFile) {
                if ($request->token == $downloadFile->token) {
                    if ($downloadFile?->variation_id) {
                        $files = $this->getVariationDigitalFiles($downloadFile?->variation_id);
                    }

                    if ($downloadFile?->product_id) {
                        $files = $this->getProductDigitalFiles($downloadFile?->product_id);
                    }

                    $downloadFile->update([
                        'token' => null
                    ]);

                    return MediaStream::create("{$this->generateFileName($downloadFile)}.zip")->addMedia($files);
                }
            }

            throw new Exception('The token has expired; please generate a new download link.', 403);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function assignLicenseKey($downloadFile)
    {
        $licenseKey = $this->getRandomLicenseKey($downloadFile);
        $order = $this->getPurchasedDetailById($downloadFile->order_id);

        if ($licenseKey && $order) {
            $licenseKey->update([
                'purchased_by_id' => $order?->consumer_id,
                'purchased_at' => $order?->created_at
            ]);

            return $licenseKey;
        }
    }

    public function getLicenseKeyById($license_key_id)
    {
        return LicenseKey::where('id', $license_key_id)->whereNull('deleted_at')?->first();
    }

    public function downloadKey($request)
    {
        try {

            $downloadFile = $this->model->where('id', $request->id)?->where('token', $request->token)?->first();
            if ($downloadFile) {
                if ($request->token == $downloadFile->token) {
                    $product = $this->getLicensableProduct($downloadFile->product_id);
                    if ($product) {
                        if (!$downloadFile->license_key_id) {
                            throw new Exception('License Key not available for this product.', 400);
                        } else {
                            $licenseKey = $this->getLicenseKeyById($downloadFile->license_key_id);
                        }

                        $downloadFile->update([
                            'token' => null
                        ]);

                        return $this->createTextMessageFile($licenseKey->license_key);
                    }

                    throw new Exception('This product is not licensable.', 400);
                }

                throw new Exception('The token has expired; please generate a new download link.', 403);
            }

            throw new Exception('The token id for downloading key is not valid.', 422);
        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function verifyDownloadFile($downloadFile)
    {
        if ($downloadFile) {
            if (Helpers::isUserLogin()) {
                $roleName = Helpers::getCurrentRoleName();
                if ($roleName == RoleEnum::CONSUMER) {
                    $consumer_id = Helpers::getCurrentUserId();
                    if ($downloadFile?->consumer_id == $consumer_id) {
                        return true;
                    }

                    throw new Exception('The download file ID is not valid for the current user.', 400);
                }
            }

            return true;
        }

        throw new Exception('Provided download file id is invalid', 422);
    }
}
