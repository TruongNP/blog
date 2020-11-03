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
        Route::get('/', function () {
            return view('admin.module.dashboard.index');
        })->name('dashboard.index');
    });

    Route::group(['prefix' => 'products'], function () {
        Route::get('/{path}', function () {
            return view('admin.module.products.index');
        })->where('path', '.*')->name('products.index');
    });
    
});
