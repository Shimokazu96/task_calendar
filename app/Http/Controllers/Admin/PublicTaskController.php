<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PublicTask;
use App\Http\Requests\PublicTaskRequest;
use Illuminate\Http\Request;

class PublicTaskController extends Controller
{

    public function index()
    {
        return PublicTask::orderBy('created_at')->with(['section', 'task'])->get();
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
    public function show(PublicTask $public_task)
    {
        return response()->json($public_task->with(['section', 'task'])->first(), 200) ?? abort(404);
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
}
