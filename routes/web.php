<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
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
Route::get('/test', function() {
    $v = '{"variant":[{"color":"red","size":"no","quantity":"0"}]}';
    return response()->json($v);
});

Route::get('/send-mail', 'SendMail@sendMail');


Route::get('/', function() {
    return view('website.public.footer');
});
Route::get('/admin/login', 'UserController@getLogin')->name('admin.login');
Route::post('/admin/login', 'UserController@postLogin');

Route::get('/admin/logout', 'UserController@getLogout')->name('admin.logout');

// admin
$prefixAdmin = 'admin';

Route::group(['prefix' => $prefixAdmin, 'middleware' => 'adminLogin'], function () {

    Route::get('/', function () {
        return view('admin.module.dashboard.index');
    })->name('admin.index');

    Route::group(['prefix' => 'dashboard'], function () {
        Route::get('/', function () {
            return view('admin.module.dashboard.index');
        })->name('dashboard.index');
    });

    Route::group(['prefix' => 'products'], function () {
        Route::get('/', function () {
            return view('admin.module.products.index');
        })->name('products.index');

        Route::get('/add', function () {
            return view('admin.module.products.add');
        })->name('products.add');

        Route::get('/edit/{id}', function () {
            return view('admin.module.products.edit');
        })->name('products.edit');
    });

    Route::group(['prefix' => 'discounts'], function () {
        Route::get('/', function () {
            return view('admin.module.discounts.index');
        })->name('discounts.index');

        Route::get('/add', function () {
            return view('admin.module.discounts.add');
        })->name('discounts.add');

        Route::get('/edit/{id}', function () {
            return view('admin.module.discounts.edit');
        })->name('discounts.edit');
    });

    Route::group(['prefix' => 'collections'], function () {
        Route::get('/', function () {
            return view('admin.module.collections.index');
        })->name('collections.index');

        Route::get('/add', function () {
            return view('admin.module.collections.add');
        })->name('collections.add');

        Route::get('/edit/{id}', function () {
            return view('admin.module.collections.edit');
        })->name('collections.edit');
    });

    Route::group(['prefix' => 'orders'], function () {
        Route::get('/', function () {
            return view('admin.module.orders.index');
        })->name('orders.index');

        Route::get('/add', function () {
            return view('admin.module.orders.add');
        })->name('orders.add');

        Route::get('/edit/{id}', function () {
            return view('admin.module.orders.edit');
        })->name('orders.edit');
    });

    Route::group(['prefix' => 'customers'], function () {
        Route::get('/', function () {
            return view('admin.module.customers.index');
        })->name('customers.index');

        Route::get('/add', function () {
            return view('admin.module.customers.add');
        })->name('customers.add');

        Route::get('/edit/{id}', function () {
            return view('admin.module.customers.edit');
        })->name('customers.edit');
    });

    Route::group(['prefix' => 'emails'], function () {
        Route::get('/', function () {
            return view('admin.module.emails.index');
        })->name('emails.index');

        Route::get('/create', function () {
            return view('admin.module.emails.create');
        })->name('emails.create');

        Route::get('/view/{id}', function () {
            return view('admin.module.emails.view');
        })->name('emails.view');
    });

    Route::group(['prefix' => 'subscribes'], function () {
        Route::get('/', function () {
            return view('admin.module.subscribes.index');
        })->name('subscribes.index');
    });

    Route::group(['prefix' => 'settings'], function () {
        Route::get('/', function () {
            return view('admin.module.settings.index');
        })->name('settings.index');

        Route::get('/general', function () {
            return view('admin.module.settings.general');
        })->name('settings.general');

        Route::get('/profile', function () {
            return view('admin.module.settings.profile');
        })->name('settings.profile');

        Route::get('/media', function () {
            return view('admin.module.settings.media');
        })->name('settings.media');

        Route::get('/swatches', function () {
            return view('admin.module.settings.swatches');
        })->name('settings.swatches');
    });

    Route::group(['prefix' => 'facebook-chat'], function () {
        Route::get('/', function () {
            return view('admin.module.facebook_chat.index');
        })->name('facebook_chat.index');
    });
    
});
