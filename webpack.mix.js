const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('public');

mix.js('resources/react-app/src/index.js', 'public/js/app.js')
    .version()
    .copy('resources/react-app/public', 'public')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);
