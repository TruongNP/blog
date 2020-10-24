<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductAdmin extends Controller
{
    //
    private $path_view = 'admin.module.products.';

    public function getIndex() 
    {
        return view($this->path_view .'index');
    }

    public function getAdd() 
    {
        return view($this->path_view .'add');
    }
    public function getEdit() 
    {
        return view($this->path_view .'edit');
    }
}
