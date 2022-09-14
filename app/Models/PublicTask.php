<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class PublicTask extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    /** JSONに含める属性 */
    protected $appends = [
        'applied_public_task',
        'task_completion_notification',
        'fixed_applied_public_task'
    ];

    public function task()
    {
        return $this->belongsTo(Task::class, 'task_id', 'id');
    }
    public function section()
    {
        return $this->belongsTo(Section::class, 'section_id', 'id');
    }
    //応募したしたユーザー
    public function applicantUsers()
    {
        return $this->belongsToMany(User::class, 'applicant_users', 'public_task_id', 'user_id')->withPivot('fixed', 'task_completion_notification');
    }
    //申請済みか判定
    public function getAppliedPublicTaskAttribute()
    {
        if (Auth::guest() || Auth::guard('admin')->user()) {
            return false;
        }
        return $this->applicantUsers->contains(function ($user) {
            return $user->id === Auth::guard('web')->user()->id;
        });
    }
    //タスク完了済みか判定
    public function getFixedAppliedPublicTaskAttribute()
    {
        if (Auth::guest() || Auth::guard('admin')->user()) {
            return false;
        }
        return $this->applicantUsers->contains(function ($user) {
            return $user->id === Auth::guard('web')->user()->id && $user->pivot->fixed === 1;
        });
    }
    //タスク完了済みか判定
    public function getTaskCompletionNotificationAttribute()
    {
        if (Auth::guest() || Auth::guard('admin')->user()) {
            return false;
        }
        return $this->applicantUsers->contains(function ($user) {
            return $user->id === Auth::guard('web')->user()->id && $user->pivot->task_completion_notification === 1;
        });
    }

    //タスク合計時間
    public function calculateTime()
    {
        $start_time = $this->date . " " . $this->start_time;
        $end_time = $this->date . " " . $this->end_time;

        return number_format((strtotime($end_time) - strtotime($start_time)) / 3600, 1);
    }
    //月に変換
    public function formatMonth()
    {
        return date('Y-m', strtotime($this->date));
    }
    public static function color($color)
    {
        $result = "";
        switch ($color) {
            case "primary":
                $result = "#1976d2";
                break;
            case "secondary":
                $result = "#9c27b0";
                break;
            case "warning":
                $result = "#ed6c02";
                break;
        }
        return $result;
    }
}
