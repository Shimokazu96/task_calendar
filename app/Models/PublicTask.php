<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublicTask extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function task()
    {
        return $this->belongsTo(Task::class, 'task_id', 'id');
    }
    public function section()
    {
        return $this->belongsTo(Section::class, 'section_id', 'id');
    }

    //確定したユーザー
    public function determined_users()
    {
        return $this->belongsToMany(User::class, 'determined_users', 'public_task_id', 'user_id')->withTimestamps();
    }
    //応募したしたユーザー
    public function applicant_users()
    {
        return $this->belongsToMany(User::class, 'applicant_users', 'public_task_id', 'user_id')->withTimestamps();
    }
    //タスク完了通知
    public function task_completion_notifications()
    {
        return $this->belongsToMany(User::class, 'task_completion_notifications', 'public_task_id', 'user_id')->withTimestamps();
    }
}
