<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\PublicTask;
use App\Models\TotalMonthlyTaskHour;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PublicTaskController extends Controller
{
    // 公開タスク一覧
    public function index(Request $request)
    {
        $public_tasks = PublicTask::where("date", "LIKE", "%" . $request->date . "%")->with(['section', 'task'])->orderBy("date", "asc")->paginate(10);

        return response()->json(["public_tasks" => $public_tasks, "date" => $request->date], 200) ?? abort(404);
    }
    // 公開タスクの日付検索
    public function getTasksThisDate($date)
    {
        $public_tasks = PublicTask::where("date", "LIKE", "%" . $date . "%")->with(['section', 'task'])->get();
        $public_task = [];
        foreach ($public_tasks as $key => $value) {
            $public_task[] = [
                'id' => $value->id,
                'resourceId' => $value->section->id,
                'title' => $value->task->task_name . "(" . $value->determined_personnel . "/" . $value->required_personnel . ")",
                'start' => $value->date . 'T' . $value->start_time,
                'end' => $value->date  . 'T' . $value->end_time,
                'url' => config("app.url") . "/public_task/" . $value->id,
                'color' => PublicTask::color($value->task->color),
            ];
        }
        return response()->json($public_task, 200) ?? abort(404);
    }
    // 公開タスク詳細
    public function show($id)
    {
        $public_task = PublicTask::where('id', $id)->with(['section', 'task', 'applicantUsers'])->first();
        return response()->json(["public_task" => $public_task, "applicantUsers" => $public_task->applicantUsers], 200) ?? abort(404);
    }

    //タスク申請
    public function applyPublicTask(Request $request, PublicTask $public_task)
    {
        $user = User::where('id', Auth::guard('web')->user()->id)->first();
        $public_task->applicantUsers()->detach($user->id);
        $public_task->applicantUsers()->attach($user->id, ["fixed" => false]);

        return response()->json(200) ?? response()->json([], 500);
    }
    //タスク申請のキャンセル
    public function cancelPublicTask(Request $request, PublicTask $public_task)
    {
        $user = User::where('id', Auth::guard('web')->user()->id)->first();
        if ($public_task->fixed_applied_public_task) {
            return response()->json("fixed_task");
        }
        $public_task->applicantUsers()->detach($user->id);

        return response()->json(200) ?? response()->json([], 500);
    }
    //タスク完了
    public function completePublicTask(Request $request, PublicTask $public_task, TotalMonthlyTaskHour $total_monthly_task_hour)
    {
        $user = User::where('id', Auth::guard('web')->user()->id)->first();
        $month = $public_task->formatMonth();
        $working_hours = $public_task->calculateTime();
        $_this_total_monthly_task_hour = $total_monthly_task_hour->where("user_id", $user->id)->where("month", $month)->first();

        if (!$_this_total_monthly_task_hour) {
            $total_monthly_task_hour->fill([
                "user_id" => $user->id,
                "month" => $month,
                "total_monthly_task_hours" => $working_hours,
            ]);
            $total_monthly_task_hour->save();
        }
        if ($_this_total_monthly_task_hour) {
            $_this_total_monthly_task_hour->fill([
                "user_id" => $user->id,
                "month" => $month,
                "total_monthly_task_hours" => $working_hours,
            ]);
            $_this_total_monthly_task_hour->save();
        }
        $public_task->applicantUsers()->detach($user->id);
        $public_task->applicantUsers()->attach($user->id, ["fixed" => true, "task_completion_notification" => true]);

        return response()->json(200) ?? response()->json([], 500);
    }
}
