@include('admin.public.header')
    <body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">
  
      @include('admin.public.sidebar')
  
      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
  
        @yield('main-content')

    @include('admin.public.footer')
  
  </body>
  
  </html>