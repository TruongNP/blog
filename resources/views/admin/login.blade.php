@include('admin.public.header')
    <body id="page-top">

        <div class="container">
            <div class="row">
                <div class="col-5 pt-5 m-auto">
                    <!-- Page Wrapper -->
         <div id="wrapper">
    
            <!-- Content Wrapper -->
            <div id="content-wrapper" class="d-flex flex-column">
    
                <!-- Material form subscription -->
                <div class="card">
                
                    <h5 class="card-header info-color white-text text-center py-4">
                        <strong>Login</strong>
                    </h5>
                
                    <!--Card content-->
                    <div class="card-body px-lg-5">
                
                        <!-- Form -->
                        <form action={{ route('admin.login') }} method="POST" class="text-center" style="color: #757575;" action="#!">
                
                            @include('admin.public.error') 
                            @include('admin.public.message') 
                        <input type="hidden" value="{{ csrf_token() }}" name="_token">
                            <!-- Email -->
                            <div class="md-form mt-3">
                                <input type="email" id="materialSubscriptionFormPasswords" name="email" class="form-control" placeholder="Email">
                            </div>
                
                            <!--Password -->
                            <div class="md-form">
                                <input type="password" id="materialSubscriptionFormEmail" name="password" class="form-control" placeholder="Password">
                            </div>
                
                            <!-- Sign in button -->
                            <button class="btn btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect" type="submit">Sign in</button>
                
                        </form>
                        <!-- Form -->
                
                    </div>
                
                </div>
        <!-- Material form subscription -->
            </div>
        </div>
    </div>
  
</body>

</html>