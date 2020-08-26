<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\BlogSubCategories;

class Blog extends Model
{
    protected $table = "blogs";
    protected $primaryKey = 'id';

    public function get_categories()
    {
        $cat = new BlogSubCategories();
        return $this->belongsTo($cat, 'cat_id');
    }
}
