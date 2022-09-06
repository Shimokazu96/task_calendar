<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\PublicTask;


class UserController extends Controller
{
    public function show(User $user)
    {
        return $user ?? abort(404);
    }

    //申請済みのタスク一覧
    public function appliedPublicTask(Request $request,User $user, PublicTask $public_task)
    {
        $user = User::where('id', Auth::guard('web')->user()->id)->first();
        $public_task->determined_personnel = $public_task->determined_personnel;
        $public_task->save();
        $public_task->applicantUsers()->detach($user->id);
        $public_task->applicantUsers()->attach($user->id, ["fixed" => false]);

        return response()->json(200) ?? response()->json([], 500);
    }

    /**
     * Remove the specified resource from storage.
     *  削除
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(200) ?? abort(404);
    }
}
