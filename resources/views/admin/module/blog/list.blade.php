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
              <h6 class="m-0 font-weight-bold text-primary">All Blogs</h6>
            </div>
            <div class="card-body">
              @include('admin.public.message')  
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
                               <p>{{ $item->title }}</p>
                               <a href="{!! route('blog.list') !!}/edit/{!! $item->id !!}" class="border-right pl-1 pr-1">Edit</a>
                               <a href="{!! route('blog.list') !!}/delete/{!! $item->id !!}">Delete</a>
                             </td>
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