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
//login page 
Route::get('/admin/login', 'UserController@getLogin')->name('admin.login');
Route::post('/admin/login', 'UserController@postLogin');

Route::get('/admin/logout', 'UserController@getLogout')->name('admin.logout');

// admin
$prefixAdmin = 'admin';

Route::group(['prefix' => $prefixAdmin, 'middleware' => 'adminLogin'], function () {

    Route::group(['prefix' => 'dashboard'], function () {
        $controller = 'DashboardAdmin';
        Route::get('/', $controller.'@getIndex')->name('dashboard.index');
    });

    Route::group(['prefix' => 'products'], function () {
        $controller = 'ProductAdmin';
        Route::get('/', $controller.'@getIndex')->name('products.index');
        Route::get('/add', $controller.'@getAdd')->name('products.add');
        Route::get('/edit', $controller.'@getEdit')->name('products.edit');
    });
    
    Route::group(['prefix' => 'blog'], function () {
        $controller = 'BlogAdmin';
        $controller_cat = 'BlogCategoriesAdmin';

        // blog
        Route::get('/', $controller.'@getIndex')->name('blog.index');
        Route::get('/add', $controller.'@getAdd')->name('blog.add');
        Route::get('/edit/{id}', $controller.'@getEdit')->name('blog.edit');

        // catrgories
        Route::get('/categories', $controller_cat.'@index')->name('blog.categories');
        Route::get('/categories/delete/{id}', $controller_cat.'@get_delete_blog_categories_by_id');
        Route::get('/categories/edit/{id}', $controller_cat.'@get_blog_categories_by_id')->name('blog.categories.edit');

        Route::post('/categories', $controller_cat.'@post_add_blog_categories');
        Route::post('/categories/edit/{id}', $controller_cat.'@post_edit_blog_categories_by_id');
        
    });
    
});
