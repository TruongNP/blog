<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    
    <h1>Blog</h1>
   <table border="1">
       <thead>
           <tr>
                <th>Id</th>
                <th>Tiêu Đề</th>
                <th>Nội Dung</th>
                <th>Hành Động</th>
            </tr>
       </thead>
       <tbody>
       @foreach ($results as $item)
           <tr>
                <td>{{ $item->id }}</td>
                <td>{{ $item->title }}</td>
                <td>{{ $item->content }}</td>
                <td><a href="{!! route('blog.list') !!}/edit/{!! $item->id !!}">Chỉnh Sửa</a></td>
            </tr>
       @endforeach
   </tbody>
   </table>
   
</body>
</html>