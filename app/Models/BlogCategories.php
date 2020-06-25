<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogCategories extends Model
{
    protected $table = "blog_categories";
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function get_child_categories()
    {
        return $this->hasMany('App\Models\BlogChildCategories', 'parent_cat_id');
    }
}
