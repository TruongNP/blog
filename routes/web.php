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

// admin
$prefixAdmin = 'admin';
Route::group(['prefix' => $prefixAdmin], function () {
    $prefix = 'blog';
    Route::group(['prefix' => $prefix], function () {
        $controller = 'BlogAdmin';
        $controller_cat = 'BlogCategoriesAdmin';

        // blog
        Route::get('/', $controller.'@get_all_blog')->name('blog.list');
        Route::get('/add', $controller.'@get_add_blog')->name('blog.add');
        Route::get('/edit/{id}', $controller.'@get_blog_by_id')->name('blog.edit');
        Route::get('/delete/{id}', $controller.'@get_delete_blog_by_id')->name('blog.delete');

        Route::post('/add', $controller.'@post_add_blog');
        Route::post('/edit/{id}', $controller.'@post_edit_blog_by_id');

        // catrgories
        Route::get('/categories', $controller_cat.'@index')->name('blog.categories');
        Route::get('/categories/delete/{id}', $controller_cat.'@get_delete_blog_categories_by_id')->name('blog.categories.delete');
        Route::get('/categories/edit/{id}', $controller_cat.'@get_blog_categories_by_id')->name('blog.categories.edit');
        Route::get('/subcategories/delete/{id}', $controller_cat.'@get_delete_blog_subcategories_by_id')->name('blog.subcategories.delete');
        Route::get('/subcategories/edit/{id}', $controller_cat.'@get_blog_subcategories_by_id')->name('blog.subcategories.edit');


        Route::post('/categories', $controller_cat.'@post_add_blog_categories');
        Route::post('/categories/edit/{id}', $controller_cat.'@post_edit_blog_categories_by_id');
        Route::post('/subcategories/edit/{id}', $controller_cat.'@post_edit_blog_subcategories_by_id');
        
    });
    
});
