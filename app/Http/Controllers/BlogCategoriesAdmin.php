<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\BlogCategoriesRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\BlogCategories;
use App\Models\BlogChildCategories;

class BlogCategoriesAdmin extends Controller
{
    private $path_view = 'admin.module.blog.';

    protected function index()
    {
        $categories_list = $this->get_all_blog_catrgories();

        return view($this->path_view .'categories', ['results' => $categories_list]);
    }

    public function get_all_blog_catrgories() 
    {
        $results = BlogCategories::all()->sortByDesc('id');

        return $results;
        // $data = BlogCategories::find(5)->get_parent_categories->toArray();
        // dd($data);
    }

    public function post_add_blog_categories(BlogCategoriesRequest $request) 
    {
        if( $request->parent_categories == 0 )
        {
            $blog_categories = new BlogCategories();
        }
        else 
        {
            $blog_categories = new BlogChildCategories();
            $blog_categories->parent_cat_id = $request->parent_categories;
        }
        
        $blog_categories->title = $request->title;
        $blog_categories->slugs = $request->slugs;
        
        $blog_categories->save();
        return redirect()->route('blog.categories')->with('message' , 'Categories created');
    }

    public function get_delete_blog_categories_by_id($id) 
    {
        $blog = BlogCategories::find($id);
        
        $blog->delete();
        return redirect()->route('blog.categories')->with('message' , 'Blog deleted');
    }

    public function get_blog_categories_by_id($id)
    {
        $blog_categories = BlogCategories::find($id);

        return view($this->path_view .'edit_categories', ['blog_categories' => $blog_categories]);
    }

    public function post_edit_blog_categories_by_id(BlogCategoriesRequest $request, $id) 
    {
        $blog_categories = BlogCategories::find($id);
        $blog_categories->title = $request->title;
        $blog_categories->slugs = $request->slugs;
        // $blog_categories->slugs = Str::slug($request->slugs, '-');
        
        $blog_categories->save();
        return redirect()->route('blog.categories.edit', ['id'=>$blog_categories->id])->with('message' , 'Blog updated');
    }
}
