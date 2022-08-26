<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class PublicTaskRequest extends FormRequest
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
        $time = date("H:i");

        return [
            'task_id' => 'required',
            'section_id' => 'required',
            'required_personnel' => 'required',
            'date' => 'required|date|after:yesterday',
            'start_time' =>  "required|date_format:H:i|after:" . $time,
            'end_time' => 'required|date_format:H:i|after:start_time',
        ];
    }

    public function attributes()
    {
        return [
            'task_id' => 'タスク',
            'section_id' => 'セクション',
            'required_personnel' => '必要人数',
            'determined_personnel' => '確定人数',
            'date' => '日付',
            'start_time' =>  '開始時間',
            'end_time' => '終了時間',
        ];
    }
}
