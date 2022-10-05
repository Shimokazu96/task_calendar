<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PublicTask;
use App\Models\TotalDailyTaskHour;
use App\Http\Requests\PublicTaskRequest;
use Illuminate\Http\Request;
use App\Models\User;

class PublicTaskController extends Controller
{

    public function index()
    {
        return PublicTask::orderByDesc('id')->with(['section', 'task', 'applicantUsers'])->get();
    }

    public function getTasksThisDate($_this_total_daily_task_hour)
    {
        $public_tasks = PublicTask::where("date", "LIKE", "%" . $_this_total_daily_task_hour . "%")->with(['section', 'task'])->get();
        $public_task = [];
        foreach ($public_tasks as $key => $value) {
            $public_task[] = [
                'id' => $value->id,
                'resourceId' => $value->section->id,
                'title' => $value->task->task_name . "(" . $value->determined_personnel . "/" . $value->required_personnel . ")",
                'start' => $value->date . 'T' . $value->start_time,
                'end' => $value->date  . 'T' . $value->end_time,
                'url' => config("app.url") . "/admin/public_task/" . $value->id,
                'color' => PublicTask::color($value->task->color),
            ];
        }
        return response()->json($public_task, 200) ?? abort(404);
    }


    public function store(PublicTaskRequest $request, PublicTask $public_task)
    {
        $public_task = PublicTask::create($request->all());

        return $public_task
            ? response()->json($public_task, 201)
            : response()->json([], 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PublicTask  $public_task
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $public_task = PublicTask::where('id', $id)->with(['section', 'task', 'applicantUsers'])->first();
        return response()->json(["public_task" => $public_task, "applicantUsers" => $public_task->applicantUsers], 200) ?? abort(404);
    }


    public function update(PublicTaskRequest $request, PublicTask $public_task)
    {
        $public_task->fill($request->all());
        $public_task->save();
        return $public_task->update()
            ? response()->json($public_task)
            : response()->json([], 500);
    }


    public function destroy(PublicTask $public_task)
    {
        return $public_task->delete()
            ? response()->json($public_task)
            : response()->json([], 500);
    }

    //タスクの確定
    public function fixPublicTask(Request $request, PublicTask $public_task, TotalDailyTaskHour $total_daily_task_hour, $id)
    {
        $user = User::where('id', $id)->first();
        $_this_total_daily_task_hour = $total_daily_task_hour->where("user_id", $user->id)->where("date", $public_task->date)->first();
        $working_hours = $public_task->calculateTime();
        //過去の日付
        $today = date('Y-m-d');
        if($public_task->date < $today) {
            return response()->json("past_tasks");
        }
        //必要人数を超えている
        if ($public_task->required_personnel <= $public_task->determined_personnel) {
            return response()->json("over_capacity");
        }
        //一日8時間を超えている
        if ($_this_total_daily_task_hour && !$_this_total_daily_task_hour->canAddTasks($working_hours)) {
            return response()->json("over_hours");
        }

        if (!$_this_total_daily_task_hour) {
            $total_daily_task_hour->fill([
                "user_id" => $user->id,
                "date" => $public_task->date,
                "total_daily_task_hours" => $working_hours,
            ]);
            $total_daily_task_hour->save();
        }

        if ($_this_total_daily_task_hour && $_this_total_daily_task_hour->canAddTasks($working_hours)) {
            $_this_total_daily_task_hour->fill([
                "total_daily_task_hours" => $_this_total_daily_task_hour->total_daily_task_hours + $working_hours,
            ]);
            $_this_total_daily_task_hour->save();
        }


        $public_task->determined_personnel = $public_task->determined_personnel + 1;
        $public_task->save();
        $public_task->applicantUsers()->detach($user->id);
        $public_task->applicantUsers()->attach($user->id, ["fixed" => true]);

        return response()->json(200) ?? response()->json([], 500);
    }
    // タスクのキャンセル
    public function cancelPublicTask(Request $request, PublicTask $public_task, TotalDailyTaskHour $total_daily_task_hour, $id)
    {
        $user = User::where('id', $id)->first();
        //過去の日付
        $today = date('Y-m-d');
        if($public_task->date < $today) {
            return response()->json("past_tasks");
        }
        //タスク報告済み
        $reported = $public_task->applicantUsers->contains(function ($apply_user) use ($id) {
            return $apply_user->id == $id && $apply_user->pivot->task_completion_notification === 1;
        });
        if ($reported) {
            return response()->json("already_reported");
        }
        $_this_total_daily_task_hour = $total_daily_task_hour->where("user_id", $user->id)->where("date", $public_task->date)->first();
        $working_hours = $public_task->calculateTime();

        if (!$_this_total_daily_task_hour->canAddTasks($working_hours)) {
            $_this_total_daily_task_hour->fill([
                "total_daily_task_hours" => 0,
            ]);
            $_this_total_daily_task_hour->save();
        }
        if ($_this_total_daily_task_hour->canAddTasks($working_hours)) {
            $_this_total_daily_task_hour->fill([
                "total_daily_task_hours" => $_this_total_daily_task_hour->total_daily_task_hours - $working_hours,
            ]);
            $_this_total_daily_task_hour->save();
        }
        $public_task->applicantUsers()->detach($user->id);
        $public_task->applicantUsers()->attach($user->id, ["fixed" => false]);
        $public_task->determined_personnel = $public_task->determined_personnel - 1;
        $public_task->save();

        return response()->json(200) ?? response()->json([], 500);
    }
}
