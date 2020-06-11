<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Menu extends Component
{
    public $name;
    public $slug;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name, $slug)
    {
        //
        $this->name = $name;
        $this->slug = $slug;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return view('components.menu');
    }
}
