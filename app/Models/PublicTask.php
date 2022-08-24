<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublicTask extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function task() {
        return $this->belongsTo( Task::class, 'task_id', 'id' );
    }
    public function section() {
        return $this->belongsTo( Section::class, 'section_id', 'id' );
    }
}
