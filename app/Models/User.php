<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'fixed_public_task',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
    /** JSONに含める属性 */
    protected $appends = [
        'fixed_public_task'
    ];
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    //確定したユーザー
    public function determined_users()
    {
        return $this->belongsToMany(User::class, 'determined_users', 'user_id', 'public_task_id')->withTimestamps();
    }
    //応募したしたユーザー
    public function applicant_users()
    {
        return $this->belongsToMany(User::class, 'applicant_users', 'user_id', 'public_task_id')->withTimestamps();
    }
    //タスク完了通知
    public function task_completion_notifications()
    {
        return $this->belongsToMany(User::class, 'task_completion_notifications', 'user_id', 'public_task_id')->withTimestamps();
    }

    public function getFixedPublicTaskAttribute()
    {
        return $this->determined_users()->first() ? true : false;
    }
}
