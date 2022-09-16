<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Http\Requests\TaskRequest;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    public function index()
    {
        // abort(500);
        // return [];
        return Task::orderByDesc('id')->get();
    }


    public function store(TaskRequest $request, Task $task)
    {
        $task->fill($request->all());
        $task->color = Task::color();
        $task->save();

        return $task
            ? response()->json($task, 201)
            : response()->json([], 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        return response()->json($task, 200) ?? abort(404);
    }


    public function update(TaskRequest $request, Task $task)
    {
        $task->fill($request->all());
        $task->save();
        return $task->update()
            ? response()->json($task)
            : response()->json([], 500);
    }


    public function destroy(Task $task)
    {
        return $task->delete()
            ? response()->json($task)
            : response()->json([], 500);
    }

    public function getTaskName()
    {
        return Task::where('display_flag', true)->get(['id', 'task_name']);
    }
}
