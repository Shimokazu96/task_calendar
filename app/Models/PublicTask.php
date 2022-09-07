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
        'task_completion_notification'
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
        return $this->belongsToMany(User::class, 'applicant_users', 'public_task_id', 'user_id')->withPivot('fixed','task_completion_notification');
    }

    public function getAppliedPublicTaskAttribute()
    {
        if (Auth::guest() || Auth::guard('admin')->user()) {
            return false;
        }
        return $this->applicantUsers->contains(function ($user) {
            return $user->id === Auth::guard('web')->user()->id;
        });
    }
    public function getTaskCompletionNotificationAttribute()
    {
        if (Auth::guest() || Auth::guard('admin')->user()) {
            return false;
        }
        return $this->applicantUsers->contains(function ($user) {
            return $user->id === Auth::guard('web')->user()->id && $user->pivot->task_completion_notification === 1;
        });
    }
}
