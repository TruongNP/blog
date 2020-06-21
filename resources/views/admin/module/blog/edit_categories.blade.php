@extends('admin.master')
@section('title')
    Blog Categories
@endsection

@section('main-content')
    <!-- Main Content -->
    <div id="content">

        @include('admin.public.topbar')

        <!-- Begin Page Content -->
        <div class="container-fluid">

          <!-- Page Heading -->
          <h1 class="h3 mb-2 text-gray-800">Categories</h1>
          
          <!-- DataTales Example -->
          <div class="card shadow mb-4">
            <div class="card-header py-3 mb-3">
              <h6 class="m-0 font-weight-bold text-primary">Edit</h6>
            </div>
            @include('admin.public.message')  
            <div class="card-body col-lg-4">

                @include('admin.public.error')

                <form action="{{ route('blog.categories.edit', ['id'=>$blog_categories->id]) }}" method="post">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="form-group">
                        <label for="formGroupExampleInput">Title</label>
                        <input type="text" class="form-control" name="title" id="txt-title" value="{!! $blog_categories->title !!}">
                      </div>
                      <div class="form-group">
                        <label for="formGroupExampleInput">Slug</label>
                        <input type="text" class="form-control" name="slugs" id="txt-slug" value="{!! $blog_categories->slugs !!}">
                      </div>
                      
                    <button class="btn btn-primary" type="submit">Update</button>
                  </form>
            </div>
          </div>

        </div>
        <!-- /.container-fluid -->

      </div>
      <!-- End of Main Content -->
@endsection

@section('script')
<script> CKEDITOR.replace('txt-content'); </script>
    <script>
        $(document).ready(function(){
            //
        });
    </script>
@endsection