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
      <a class="nav-link collapsed" href="{{ route('collections.index') }}" data-toggle="collapse" data-target="#collapseCollections" aria-expanded="true" aria-controls="collapseTwo">
        <i class="fas fa-ethernet"></i>
        <span>Collections</span>
      </a>
      <div id="collapseCollections" class="collapse" aria-labelledby="headingTwo" data-parent="#collapseCollections">
        <div class="bg-white py-2 collapse-inner rounded">
          <a class="collapse-item" href="{{ route('collections.index') }}">All Collections</a>
          <a class="collapse-item" href="{{ route('collections.add') }}">Add New</a>
        </div>
      </div>
    </li>

    <li class="nav-item">
      <a class="nav-link collapsed" href="{{ route('orders.index') }}" data-toggle="collapse" data-target="#collapseOrders" aria-expanded="true" aria-controls="collapseTwo">
        <i class="fab fa-jedi-order"></i>
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
      <a class="nav-link collapsed" href="{{ route('customers.index') }}" data-toggle="collapse" data-target="#collapseCustomers" aria-expanded="true" aria-controls="collapseTwo">
        <i class="fas fa-user"></i>
        <span>Customers</span>
      </a>
      <div id="collapseCustomers" class="collapse" aria-labelledby="headingTwo" data-parent="#collapseCustomers">
        <div class="bg-white py-2 collapse-inner rounded">
          <a class="collapse-item" href="{{ route('customers.index') }}">All Customers</a>
          <a class="collapse-item" href="{{ route('customers.add') }}">Add New</a>
        </div>
      </div>
    </li>

    <li class="nav-item">
      <a class="nav-link collapsed" href="{{ route('emails.index') }}" data-toggle="collapse" data-target="#collapseEmails" aria-expanded="true" aria-controls="collapseTwo">
        <i class="fas fa-envelope"></i>
        <span>Emails</span>
      </a>
      <div id="collapseEmails" class="collapse" aria-labelledby="headingTwo" data-parent="#collapseEmails">
        <div class="bg-white py-2 collapse-inner rounded">
          <a class="collapse-item" href="{{ route('emails.index') }}">All Email</a>
          <a class="collapse-item" href="{{ route('emails.create') }}">Create New Email</a>
          <a class="collapse-item" href="{{ route('emails.index') }}">Email Received</a>
          <a class="collapse-item" href="{{ route('emails.index') }}">Email Sent</a>
        </div>
      </div>
    </li>

    <li class="nav-item">
      <a class="nav-link" href="{{ route('subscribes.index') }}" >
        <i class="fab fa-stripe-s"></i>
        <span>Subscribes</span>
      </a>
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

    <div class="sidebar-heading">
      Extensions
    </div>

    <li class="nav-item">
      <a class="nav-link" href="{{ route('facebook_chat.index') }}" >
        <i class="fab fa-facebook-messenger"></i>
        <span>Facebook Chat</span>
      </a>
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