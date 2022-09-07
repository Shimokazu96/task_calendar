<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TotalDailyTaskHour extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    const DAILY_WORKING_HOURS = 8.0;
    const MIN_HOURS = 0;

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function canAddTasks($hours)
    {
        if($this->total_daily_task_hours >= TotalDailyTaskHour::DAILY_WORKING_HOURS) {
            return false;
        }
        if($this->total_daily_task_hours + $hours >= TotalDailyTaskHour::DAILY_WORKING_HOURS) {
            return false;
        }
        return true;
    }
    public function canDeleteTasks($hours)
    {
        if($this->total_daily_task_hours <= TotalDailyTaskHour::MIN_HOURS) {
            return false;
        }
        if($this->total_daily_task_hours - $hours <= TotalDailyTaskHour::DAILY_WORKING_HOURS) {
            return false;
        }
        return true;
    }
}
