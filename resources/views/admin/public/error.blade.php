@if (count($errors) > 0)
    <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Error!</h4>
        <ul>
            @foreach ($errors->all() as $error)
                <li>{!! $error !!}</li>
            @endforeach
        </ul>
    </div>
         
@endif
