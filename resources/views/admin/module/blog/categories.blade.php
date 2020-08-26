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
            <div class="card-header d-flex align-items-center py-3 mb-3">
              <h6 class="font-weight-bold border-right border-primary text-primary text-capitalize pl-2 pr-2 m-0">View all</h6>
              <h6 class="font-weight-bold text-primary text-capitalize pl-2 pr-2 m-0">Add new</h6>
            </div>
            @include('admin.public.message')  
            @include('admin.public.error')
            <div class="card-body col-lg-4">

                <form action="{{ route('blog.categories') }}" method="post">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="form-group">
                        <label for="formGroupExampleInput">Title</label>
                        <input type="text" class="form-control" name="title" id="txt-title">
                      </div>
                      <div class="form-group">
                        <label for="formGroupExampleInput">Slug</label>
                        <input type="text" class="form-control" name="slugs" id="txt-slug">
                      </div>
                      <div class="form-group">
                        <label for="formGroupExampleInput">Parent Categories</label>
                        <select class="form-control" name="parent_categories" id="drop-parent-categories">
                          <option value="0">None</option>
                          @foreach ($results as $parent_cat)
                            <option value={{ $parent_cat->id }}>{{ $parent_cat->title }}</option>
                          @endforeach
                        </select>
                      </div>
                    <button class="btn btn-success" type="submit">Add</button>
                  </form>
            </div>
            <div class="card-body col-lg-12">
              <div class="table-responsive">
                <table class="table table-hover" id="" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th scope="col">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="tableDefaultCheck1" checked>
                          <label class="custom-control-label" for="tableDefaultCheck1">All</label>
                        </div>
                      </th>
                      <th scope="col">Title</th>
                      <th scope="col">Slugs</th>
                      <th scope="col">Publish</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th scope="col">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="" checked>
                          <label class="custom-control-label" for="tableDefaultCheck1">All</label>
                        </div>
                      </th>
                      <th scope="col">Title</th>
                      <th scope="col">Slugs</th>
                      <th scope="col">Publish</th>

                    </tr>
                  </tfoot>
                  <tbody>
                    @foreach ($results as $item)
                        <tr>
                          <td scope="row">
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="{!! $item->id !!}">
                            <label class="custom-control-label" for="tableDefaultCheck2"></label>
                          </div>
                          </td>
                          <td>
                            <a href="{!! route('blog.categories.edit', ['id'=>$item->id]) !!}" class="font-weight-bold text-primary text-decoration-none clearfix">{{ $item->title }}</a>
                            <a href="{!! route('blog.categories.edit', ['id'=>$item->id]) !!}" class="border-right pl-1 pr-1"><small>Edit</small></a>
                            <a href="{!! route('blog.categories.delete', ['id'=>$item->id]) !!}" class="text-danger"><small>Delete</small></a>
                          </td>
                          <td>{{ $item->slugs }}</td>
                          <td><p>{{ $item->created_at->format('Y-m-d') }}</p></td>
                      </tr>
                        @foreach ($item->get_sub_categories as $sub_cat)
                          <tr>
                            <td scope="row">
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="{!! $sub_cat->id !!}">
                              <label class="custom-control-label" for="tableDefaultCheck2"></label>
                            </div>
                            </td>
                            <td class="pl-4">
                              <a href="{!! route('blog.subcategories.edit', ['id'=>$sub_cat->id]) !!}" class="font-weight-bold text-primary text-decoration-none clearfix">__{{ $sub_cat->title }}</a></a>
                              <a href="{!! route('blog.subcategories.edit', ['id'=>$sub_cat->id]) !!}" class="border-right pl-1 pr-1"><small>Edit</small></a>
                              <a href="{!! route('blog.subcategories.delete', ['id'=>$sub_cat->id]) !!}" class="text-danger"><small>Delete</small></a>
                            </td>
                            <td>{{ $sub_cat->slugs }}</td>
                            <td><p>{{ $sub_cat->created_at->format('Y-m-d') }}</p></td>
                          </tr>
                        @endforeach
                        
                    @endforeach
                  </tbody>
                </table>
              </div>
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