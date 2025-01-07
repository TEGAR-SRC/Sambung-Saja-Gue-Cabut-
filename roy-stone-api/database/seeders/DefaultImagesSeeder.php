<?php

namespace Database\Seeders;

use App\Helpers\Helpers;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DefaultImagesSeeder extends Seeder
{
    protected $baseURL;

    public function __construct()
    {
        $this->baseURL = config('app.url');
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $defaultImagePaths = [
            'admin/images/settings/favicon.png',
            'admin/images/settings/logo-white.png',
            'admin/images/settings/logo-dark.png',
            'admin/images/settings/tiny-logo.png',
            'admin/images/settings/maintainance.png',
            'admin/images/settings/footer-logo.png',
        ];

        $attachments = Helpers::createAttachment();
        foreach ($defaultImagePaths as $defaultImagePath) {
            $fullImagePath = public_path($defaultImagePath);
            $attachments->copyMedia($fullImagePath)->toMediaCollection('attachment');
        }

        $attachments->delete($attachments?->id);
        DB::table('seeders')->updateOrInsert([
            'name' => 'DefaultImagesSeeder',
            'is_completed' => true
        ]);
    }
}
