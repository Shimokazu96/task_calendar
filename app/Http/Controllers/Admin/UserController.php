<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Auth\Events\Registered;
use App\Actions\Fortify\CreateNewUser;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * ユーザー一覧
     *
     */
    public function index(Request $request, User $user)
    {
        return response()->json($user->orderBy('id','desc')->get(), 200) ?? abort(404);
    }

    /**
     * Store a newly created resource in storage.
     *  ユーザー登録
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, CreateNewUser $creator)
    {
        event(new Registered($user = $creator->create($request->all())));

        return response()->json(200) ?? abort(404);
    }

    public function show(User $user)
    {
        return $user ?? abort(404);
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
