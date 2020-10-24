@extends('admin.master')
@section('title')
    Blogs
@endsection

@section('main-content')
    <!-- Main Content -->
    <div id="content">

        @include('admin.public.topbar')

        <!-- Begin Page Content -->
        <div class="container-fluid">

          <!-- Page Heading -->
          <main class="main">
            <div class="container-fluid pl-5 pb-5 pr-5">
                <h1 class="h3 mb-2 text-gray-800">Blogs</h1>
                <div class="col-12 mb-3 p-0 d-flex justify-content-between">
                    <nav class="nav">
                        <a class="nav-a active mr-3" href="#">Export</a>
                        <a class="nav-a mr-3" href="#">Import</a>
                        <a class="nav-a  mr-3" href="#">More Action</a>
                    </nav>
                    <a href="/admin/product/add" class="btn btn-primary bg-primary">Add New</a>
                </div>
                <div class="table-responsive text-nowrap">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <div class="form-check pl-0">
                                    <input type="checkbox" class="form-check-input filled-in" id="check-all"  />
                                    <label class="form-check-label small text-uppercase card-a-secondary"  htmlFor="check-all"></label>
                                    </div>
                                </th>
                                <th scope="col">Image</th>
                                <th scope="col">Title</th>
                                <th scope="col">Price</th>
                                <th scope="col">Available</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Category</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr key={index}>
                            <th scope="row">
                                <div class="form-check pl-0">
                                <input type="checkbox" class="form-check-input filled-in" id="check-1" />
                                <label class="form-check-label small text-uppercase card-a-secondary" htmlFor="check-1"></label>
                                </div>
                            </th> 
                            <td><a to={`${prefixAdmin}/edit/${item.id}`}><img src={item.feature_image} width="50" alt={item.title} /></a></td>
                            <td><a to={`${prefixAdmin}/edit/${item.id}`} class="text-primary">{item.title}</a></td>
                            <td>{item.price}</td>
                            <td class="text-primary">{item.available == true ? 'Instock' : 'Outstock'}</td>
                            <td>{item.inventory_quantity}</td>
                            <td>{categoryProduct(item.tags)}</td>
                            <td>
                                <a class="btn btn-dark-green bg-danger btn-sm m-0 py-1 px-2 mr-1 text-light" onClick={() => {deleteProduct(item.id)}} >Delete</a>
                                <a to={`${prefixAdmin}/edit/${item.id}`} class="btn btn-primary btn-sm m-0 py-1 px-2 text-light" >Edit</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>

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