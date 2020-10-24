<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardAdmin extends Controller
{
    private $path_view = 'admin.module.dashboard.';

    public function getIndex() 
    {
        return view($this->path_view .'index');
    }
}
