<ul>
    @foreach ($data as $menu)
        <x-menu :name="$menu->name" :slug="$menu->slug"/>
    @endforeach
</ul>