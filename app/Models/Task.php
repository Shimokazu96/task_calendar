<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public static function color()
    {
        $result = "";
        $latest = Task::orderBy('id', 'desc')->first();
        switch ($latest->color) {
            case "primary":
                $result = "secondary";
                break;
            case "secondary":
                $result = "warning";
                break;
            case "warning":
                $result = "info";
                break;
            case "info":
                $result = "success";
                break;
            case "success":
                $result = "error";
                break;
            case "error":
                $result = "primary";
                break;
            default:
                $result = "primary";
        }
        return $result;
    }
}
