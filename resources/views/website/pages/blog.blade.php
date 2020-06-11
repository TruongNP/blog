@include('website.public.header')
<ul>
    
    @foreach ($data as $blog_list)
        <li>{{ $blog_list->title }}</li> 
    @endforeach

</ul>