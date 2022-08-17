<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\UpdatesUserProfileInformation;
use App\Actions\Admin\UpdateAdminProfileInformation;
use App\Models\Admin;


class ProfileInformationController extends Controller
{
    /**
     * Update the user's profile information.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  App\Actions\Admin\UpdateAdminProfileInformation  $updater
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UpdateAdminProfileInformation $updater)
    {
        $updater->update($request->user(), $request->all());
        $admin = Auth::guard('admin')->user();

        return $request->wantsJson()
            ? new JsonResponse($admin, 200)
            : back()->with('status', 'profile-information-updated');
    }
}
