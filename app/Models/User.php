<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\TotalMonthlyTaskHour;

class User extends Authenticatable implements MustVerifyEmail
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
        'this_month_total_task_hour',
        'last_month_total_task_hour',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    //応募したユーザー
    public function appliedPublicTask()
    {
        return $this->belongsToMany(PublicTask::class, 'applicant_users', 'user_id', 'public_task_id')->withPivot('fixed', 'task_completion_notification');
    }

    public function totalMonthlyTaskHour()
    {
        return $this->hasMany(TotalMonthlyTaskHour::class);
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new \App\Notifications\User\VerifyEmail);
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new \App\Notifications\User\ResetPassword($token));
    }

    //今月の労働時間
    public function getThisMonthTotalTaskHourAttribute()
    {
        $this_month = TotalMonthlyTaskHour::where('user_id',$this->id)->where("month",date('Y-m'))->first();
        return $this_month ? $this_month->total_monthly_task_hours : 0;
    }
    //先月の労働時間
    public function getLastMonthTotalTaskHourAttribute()
    {
        $last_month = TotalMonthlyTaskHour::where('user_id',$this->id)->where("month",date('Y-m', strtotime('-1 month')))->first();
        return $last_month ? $last_month->total_monthly_task_hours : 0;
    }
}
