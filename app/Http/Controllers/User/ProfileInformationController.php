<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\UpdatesUserProfileInformation;
use App\Models\User;


class ProfileInformationController extends Controller
{
    /**
     * Update the user's profile information.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param \Laravel\Fortify\Contracts\UpdatesUserProfileInformation $updater
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UpdatesUserProfileInformation $updater)
    {
        $updater->update($request->user(), $request->all());
        $user = Auth::guard('web')->user();
        return $user->email_verified_at
            ? response()->json(["user" => $user, "message" => "updated"], 200)
            : response()->json(["user" => $user, "message" => "sendEmail"], 200);
    }
}
