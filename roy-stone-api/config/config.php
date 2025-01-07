<?php

return [
    'name' => 'Install',
    'configuration' => [
        'version' => [
            'PHP >= 8.1' => '8.1',
        ],
        'extensions' => [
            'Bcmath',
            'Ctype',
            'fileinfo',
            'JSON',
            'Mbstring',
            'Openssl',
            'Pdo',
            'Tokenizer',
            'Xml',
        ],
    ],
    'writables' => [
        'storage',
        'bootstrap/cache',
    ],
    'migration' => '.migration',

    'app' => [
        'APP_NAME' => env('APP_NAME', 'Laravel API'),
        'APP_ENV' => '',
        'APP_DEBUG' => 'true',
        'APP_URL' => 'http://127.0.0.1:8000',
    ],

    'installation' => 'installation.json',
];
