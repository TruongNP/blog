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
              <h6 class="font-weight-bold text-primary border-right border-primary text-capitalize pr-2 m-0">View all</h6>
              <h6 class=" m-0"><a href={{ route('blog.add') }} class="text-decoration-none font-weight-bold text-primary text-capitalize pl-2 pr-2">Add new</a></h6>
            </div>
            @include('admin.public.message')  
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th scope="col">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="tableDefaultCheck1" checked>
                          <label class="custom-control-label" for="tableDefaultCheck1">All</label>
                        </div>
                      </th>
                      <th scope="col">Title</th>
                      <th scope="col">Categoties</th>
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
                      <th scope="col">Categoties</th>
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
                               <a href="{!! route('blog.edit', ['id' => $item->id]) !!}" class="font-weight-bold texy-primary text-decoration-none clearfix">{{ $item->title }}</a>
                               <a href="{!! route('blog.edit', ['id' => $item->id]) !!}" class="border-right pl-1 pr-1"><small>Edit</small></a>
                               <a href="{!! route('blog.delete', ['id' => $item->id]) !!}" class="text-danger"><small>Delete</small></a>
                             </td>
                             <td><p>{{ $item->get_categories->title }}</p></td>
                             <td><p>{{ $item->created_at->format('Y-m-d') }}</p></td>
                         </tr>
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
    <script>
        $(document).ready(function(){
            //
        });
    </script>
@endsection