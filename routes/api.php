<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'v1'], function () {
    //product
    Route::get('/products', 'ApiProductsController@index');
    Route::post('/products', 'ApiProductsController@store');
    Route::get('/product/{id}', 'ApiProductsController@getProductById');
    Route::get('/product/delete/{id}', 'ApiProductsController@delete');
    Route::post('/product/edit', 'ApiProductsController@update');

    //setting -> general
    Route::get('/settings/general', 'ApiGeneralSettingController@index');
    Route::post('/settings/general', 'ApiGeneralSettingController@store');
    Route::post('/settings/general/update', 'ApiGeneralSettingController@update');

    //setting -> profile
    Route::get('/user', 'ApiProfileSettingController@index');
    Route::get('/user/{id}', 'ApiProfileSettingController@getUserById');
    Route::post('/user/update', 'ApiProfileSettingController@update');

    //upload
    Route::get('/uploads', 'UploadFileController@index');
    Route::get('/upload/delete/{id}', 'UploadFileController@delete');
    Route::post('/uploads', 'UploadFileController@store');

    //orders
    Route::get('/orders', 'ApiOrdersController@index');
    Route::get('/order/{id}', 'ApiOrdersController@getOrderById');
    Route::post('/orders/add', 'ApiOrdersController@store');
    Route::post('/orders/update', 'ApiOrdersController@update');

    //swatches
    Route::get('/swatches', 'ApiSwatchesController@index');
    Route::post('/swatches/add', 'ApiSwatchesController@store');
    Route::post('/swatches/update', 'ApiSwatchesController@update');
});