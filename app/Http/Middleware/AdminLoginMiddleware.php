<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use App\Models\GeneralSetting;

class AdminLoginMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(Auth::check())
        {
            $value = Auth::user();
            $general_setting = GeneralSetting::find(1);
            View::share('admin', $value);
            View::share('language', $general_setting->language);
            return $next($request);
        }
        else {
            return redirect('/admin/login');
        }
    }
}
