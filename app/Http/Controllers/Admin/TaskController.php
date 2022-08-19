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
        return Task::orderByDEsc('id')->get();
    }


    public function store(TaskRequest $request)
    {
        $task = Task::create($request->all());

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
        //
    }


    public function update(TaskRequest $request, Task $task)
    {
        $task->title = $request->title;

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
}
