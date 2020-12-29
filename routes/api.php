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

    //collections
    Route::get('/collections', 'ApiCollectionsController@index');
    Route::post('/collection', 'ApiCollectionsController@store');
    Route::get('/collection/{id}', 'ApiCollectionsController@getCollectionById');
    Route::post('/collection/edit', 'ApiCollectionsController@update');
    Route::get('/collection/delete/{id}', 'ApiCollectionsController@delete');

    //setting -> general
    Route::get('/settings/general', 'ApiGeneralSettingController@index');
    Route::post('/settings/general', 'ApiGeneralSettingController@store');
    Route::post('/settings/general/update', 'ApiGeneralSettingController@update');

    //setting -> profile
    Route::get('/user', 'ApiProfileSettingController@index');
    Route::post('/user/add', 'ApiProfileSettingController@store');
    Route::get('/user/{id}', 'ApiProfileSettingController@getUserById');
    Route::post('/user/update', 'ApiProfileSettingController@update');
    Route::get('/user/delete/{id}', 'ApiProfileSettingController@delete');

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

    //facebook chat
    Route::get('/facebook-chat', 'ApiFacebookChatController@index');
    Route::post('/facebook-chat/add', 'ApiFacebookChatController@store');
    Route::post('/facebook-chat/update', 'ApiFacebookChatController@update');

    //emails
    Route::get('/emails', 'ApiSendMailController@index');
    Route::get('/email/{id}', 'ApiSendMailController@getMailById');
    Route::post('/send-email', 'ApiSendMailController@sendMail');
    Route::get('/email/delete/{id}', 'ApiSendMailController@delete');

     //subscribes
    Route::get('/subscribes', 'ApiSubscribesController@index');
    Route::get('/subscribe/delete/{id}', 'ApiSubscribesController@delete');

    //discounts
    Route::get('/discounts', 'ApiDiscountsController@index');
    Route::post('/discounts', 'ApiDiscountsController@store');
    Route::get('/discount/{id}', 'ApiDiscountsController@getDiscountById');
    Route::get('/discounts/delete/{id}', 'ApiDiscountsController@delete');
    Route::post('/discounts/edit', 'ApiDiscountsController@update');
});