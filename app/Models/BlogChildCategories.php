<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogChildCategories extends Model
{
    protected $table = "blog_child_categories";
    protected $primaryKey = 'id';

    public function get_parent_categories()
    {
        return $this->belongsTo('App\Models\BlogCategories', 'parent_cat_id');
    }
}
