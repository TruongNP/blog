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
            <div class="card-header d-flex align-items-center py-3 mb-3">
              <h6 class=" m-0"><a href={{ route('blog.list') }} class="border-right border-primary text-decoration-none font-weight-bold text-primary text-capitalize pr-2 m-0">View all</a></h6>
              <h6 class="font-weight-bold text-primary text-capitalize pl-2 pr-2 m-0">Edit</h6>
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