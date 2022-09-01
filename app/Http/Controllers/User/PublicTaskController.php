<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\PublicTask;
use App\Http\Requests\PublicTaskRequest;
use Illuminate\Http\Request;
use App\Models\User;

class PublicTaskController extends Controller
{

    public function index()
    {
        return PublicTask::orderBy('id')->with(['section', 'task'])->paginate(10);
    }

    public function getTasksThisMonth($this_month)
    {
        $public_tasks = PublicTask::where("date", "LIKE", "%" . $this_month . "%")->with(['section', 'task'])->get();
        $public_task = [];
        foreach ($public_tasks as $key => $value) {
            $public_task[] = [
                'id' => $value->id,
                'resourceId' => $value->section->id,
                'title' => $value->task->task_name . "(" . $value->determined_personnel . "/" . $value->required_personnel . ")",
                'start' => $value->date . 'T' . $value->start_time,
                'end' => $value->date  . 'T' . $value->end_time,
                'url' => config("app.url") . "/admin/public_task/" . $value->id,
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
        $public_task = PublicTask::where('id', $id)->with(['section', 'task','applicant_users'])->first();
        return response()->json(["public_task" => $public_task, "applicant_users" => $public_task->applicant_users], 200) ?? abort(404);
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

    public function fixPublicTask(Request $request, PublicTask $public_task, $id)
    {
        $user = User::where('id', $id)->first();
        if ($public_task->required_personnel <= $public_task->determined_personnel) {
            return response()->json("over_capacity");
        }
        $public_task->determined_personnel = $public_task->determined_personnel + 1;
        $public_task->save();
        $public_task->applicant_users()->detach($user->id);
        $public_task->applicant_users()->attach($user->id, ["fixed" => true]);

        return response()->json(200) ?? response()->json([], 500);
    }
    public function cancelPublicTask(Request $request, PublicTask $public_task, $id)
    {
        $user = User::where('id', $id)->first();
        $public_task->applicant_users()->detach($user->id);
        $public_task->applicant_users()->attach($user->id, ["fixed" => false]);
        $public_task->determined_personnel = $public_task->determined_personnel - 1;
        $public_task->save();

        return response()->json(200) ?? response()->json([], 500);
    }
}
