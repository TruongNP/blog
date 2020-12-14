<!-- Sidebar -->
<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
  
    <!-- Sidebar - Brand -->
    <div id="store-info"></div>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <a class="nav-link" href="{{ route('dashboard.index') }}">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span></a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
      Module
    </div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a class="nav-link collapsed" href="{{ route('products.index') }}" data-toggle="collapse" data-target="#collapseProducts" aria-expanded="true" aria-controls="collapseTwo">
        <i class="fab fa-product-hunt"></i>
        <span>Product</span>
      </a>
      <div id="collapseProducts" class="collapse" aria-labelledby="headingTwo" data-parent="#collapseProducts">
        <div class="bg-white py-2 collapse-inner rounded">
          <a class="collapse-item" href="{{ route('products.index') }}">All Product</a>
          <a class="collapse-item" href="{{ route('products.add') }}">Add New</a>
        </div>
      </div>
    </li>

    <li class="nav-item">
      <a class="nav-link collapsed" href="{{ route('orders.index') }}" data-toggle="collapse" data-target="#collapseOrders" aria-expanded="true" aria-controls="collapseTwo">
        <i class="fab fa-product-hunt"></i>
        <span>Orders</span>
      </a>
      <div id="collapseOrders" class="collapse" aria-labelledby="headingTwo" data-parent="#collapseOrders">
        <div class="bg-white py-2 collapse-inner rounded">
          <a class="collapse-item" href="{{ route('orders.index') }}">All Orders</a>
          <a class="collapse-item" href="{{ route('orders.add') }}">Create Order</a>
        </div>
      </div>
    </li>

    <li class="nav-item">
      <a class="nav-link collapsed" href="" data-toggle="collapse" data-target="#collapseSettings" aria-expanded="true" aria-controls="collapseTwo">
        <i class="fas fa-fw fa-cog"></i>
        <span>Settings</span>
      </a>
      <div id="collapseSettings" class="collapse" aria-labelledby="headingTwo" data-parent="#collapseSettings">
        <div class="bg-white py-2 collapse-inner rounded">
          <a class="collapse-item" href="{{ route('settings.index') }}">Settings</a>
          <a class="collapse-item" href="{{ route('settings.general') }}">General</a>
          <a class="collapse-item" href="{{ route('settings.media') }}">Media</a>
        </div>
      </div>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block">

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>

  </ul>
  <!-- End of Sidebar -->

<script>
    $(document).ready(function(){
      //   $('li.nav-item').mouseenter(function() {
      //   $( this ).find( "div" ).slideDown();
      // })
      // .mouseleave(function() {
      //   $( this ).find( "div" ).slideUp();
      // });
    });
</script>