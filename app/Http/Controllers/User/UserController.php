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
    public function appliedPublicTask(Request $request, User $user, PublicTask $public_task)
    {
        $user = User::where('id', Auth::guard('web')->user()->id)->first();
        $query = $user->appliedPublicTask()->where("date", "LIKE", "%" . $request->date . "%")->with(['section', 'task']);
        $public_tasks = $query->whereHas('applicantUsers', function ($q) {
            return $q->where('fixed', false);
        })->paginate(10);
        return response()->json(["public_tasks" => $public_tasks, "date" => $request->date], 200) ?? abort(404);
    }
    //確定済みのタスク一覧
    public function fixedPublicTask(Request $request, User $user, PublicTask $public_task)
    {
        $user = User::where('id', Auth::guard('web')->user()->id)->first();
        $query = $user->appliedPublicTask()->where("date", "LIKE", "%" . $request->date . "%")->with(['section', 'task']);
        $public_tasks = $query->whereHas('applicantUsers', function ($q) {
            return $q->where('fixed', true);
        })->paginate(10);

        return response()->json(["public_tasks" => $public_tasks, "date" => $request->date], 200) ?? abort(404);
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
