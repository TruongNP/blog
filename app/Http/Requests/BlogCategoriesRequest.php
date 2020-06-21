<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogCategoriesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return 
        [
            'title' => 'required|max:50',
            'slugs' => 'required|max:50|unique:blog_categories,slugs',
        ];
    }

    public function messages()
    {
        return 
        [
            'title.required' => 'Please provide a valid city.',
            'title.max' => 'Title must be at most 50 characters.',
            'slugs.required' => 'Please provide a valid city.',
            'slugs.max' => 'Title must be at least 50 characters.',
            'slugs.unique' => 'Slug already exists',
        ];
    }
}
