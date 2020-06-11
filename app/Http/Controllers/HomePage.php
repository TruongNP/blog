<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomePage extends Controller
{
    //
    public function display_home_page() {
        return view('website.pages.home');
    }
}
