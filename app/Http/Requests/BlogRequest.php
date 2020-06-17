<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogRequest extends FormRequest
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
        return [
            'title' => 'required|min:20|max:255',
            'content' => 'required|min:50',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Please provide a valid city.',
            'title.min' => 'Title must be at least 10 characters.',
            'title.max' => 'Title must be at most 255 characters.',
            'content.required' => 'Please provide a valid city.',
            'content.min' => 'Title must be at least 50 characters.',
        ];
    }
}
