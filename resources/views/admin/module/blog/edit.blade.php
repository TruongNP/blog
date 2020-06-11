<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    
    <h1>Chỉnh Sửa Blog</h1>

    @include('admin.public.error')
    @include('admin.public.message')

    <form action="{{ route('blog.edit', ['id'=>$blogs->id]) }}" method="post">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <input type="text" name="title" id="txt-title" placeholder="title" value="{{ $blogs->title }}">
        <textarea name="content" id="txt-content"  cols="30" rows="5">{{ $blogs->content }}</textarea>
        <button id="btn-add" >Add</button>
    </form>
</body>
</html>