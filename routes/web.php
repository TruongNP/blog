<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Home page
Route::get('', 'HomePage@display_home_page');

// admin
$prefixAdmin = 'admin';
Route::group(['prefix' => $prefixAdmin], function () {
    $prefix = 'blog';
    Route::group(['prefix' => $prefix], function () {
        $controller = 'BlogAdmin';

        Route::get('/', $controller.'@get_all_blog')->name('blog.list');
        Route::get('/add', $controller.'@get_add_blog')->name('blog.add');
        Route::get('/edit/{id}', $controller.'@get_blog_by_id')->name('blog.edit');

        Route::post('/add', $controller.'@post_add_blog');
        Route::post('/edit/{id}', $controller.'@post_edit_blog_by_id');
    });
    
});
