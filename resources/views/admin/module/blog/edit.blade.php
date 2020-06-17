@extends('admin.master')
@section('title')
    Blog
@endsection

@section('main-content')
    <!-- Main Content -->
    <div id="content">

        @include('admin.public.topbar')

        <!-- Begin Page Content -->
        <div class="container-fluid">

          <!-- Page Heading -->
          <h1 class="h3 mb-2 text-gray-800">Blogs</h1>
          
          <!-- DataTales Example -->
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Edit</h6>
            </div>
            <div class="card-body col-lg-8">
                @include('admin.public.error')
                @include('admin.public.message')

                <form action="{{ route('blog.edit', ['id'=>$blogs->id]) }}" method="post">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="form-group">
                        <label for="formGroupExampleInput">Title</label>
                        <input type="text" class="form-control" name="title" id="txt-title" value="{{ $blogs->title }}">
                      </div>
                      <div class="form-group">
                        <label for="exampleFormControlTextarea3">Content</label>
                        <textarea class="form-control" name="content" id="txt-content" rows="7">{{ $blogs->content }}</textarea>
                      </div>
                      
                    <button class="btn btn-primary" type="submit">Update</button>
                  </form>
            </div>
            <div class="card-body col-lg-4"></div>
          </div>

        </div>
        <!-- /.container-fluid -->

      </div>
      <!-- End of Main Content -->
@endsection

@section('script')
    <script>
        $(document).ready(function(){
            //
        });
    </script>
@endsection