import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/assets/install/sass/app.scss',
            ],
            refresh: true,
        }),
    ],
});
