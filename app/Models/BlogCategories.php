<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\BlogSubCategories;

class BlogCategories extends Model
{
    protected $table = "blog_categories";
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function get_sub_categories()
    {
        $sub_cat = new BlogSubCategories();
        return $this->hasMany($sub_cat, 'parent_cat_id');
    }
}
