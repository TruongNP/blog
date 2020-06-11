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
            'title.required' => 'Bạn chưa nhập tiêu đề.',
            'title.min' => 'Tiêu đề phải có ít nhất 20 lý tự.',
            'title.max' => 'Tiêu đề phải có tối đa 255 lý tự.',
            'content.required' => 'Bạn chưa nhập nội dung.',
            'content.min' => 'Nội dung phải có ít nhất 50 lý tự.',
        ];
    }
}
