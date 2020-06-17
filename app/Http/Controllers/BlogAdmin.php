<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\BlogRequest;
use Illuminate\Support\Facades\DB;
use App\Blog;

$blog = new Blog();

class BlogAdmin extends Controller
{
    //
    private $path_view = 'admin.module.blog.';
    
    public function __construct()
    {
        
    }

    public function get_all_blog() 
    {
        $results = Blog::all();

        return view($this->path_view .'list', ['results' => $results]);
    }

    public function get_add_blog() 
    {
        return view($this->path_view .'add');
    }
    
    public function post_add_blog(BlogRequest $request) 
    {
        $blog = new Blog();
        $blog->title = $request->title;
        $blog->content = $request->content;
        
        $blog->save();
        return redirect()->route('blog.add');
    }

    public function get_blog_by_id($id)
    {
        $blogs = Blog::find($id);

        return view($this->path_view .'edit', ['blogs' => $blogs]);
    }

    public function post_edit_blog_by_id(BlogRequest $request, $id) 
    {
        $blog = Blog::find($id);
        $blog->title = $request->title;
        $blog->content = $request->content;
        
        $blog->save();
        return redirect()->route('blog.edit', ['id'=>$blog->id])->with('message' , 'Blog updated');
    }

    public function get_delete_blog_by_id($id) 
    {
        $blog = Blog::find($id);
        
        $blog->delete();
        return redirect()->route('blog.list')->with('message' , 'Blog deleted');
    }
}
