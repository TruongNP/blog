@if (session('message'))
<div class="alert alert-success" role="alert">
    <strong>Message!</strong> {{ session('message') }}
  </div>
    
@endif