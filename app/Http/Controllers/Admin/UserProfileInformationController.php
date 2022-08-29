<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Laravel\Fortify\Contracts\UpdatesUserProfileInformation;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserProfileInformationController extends Controller
{
    /**
     * Update the user's profile information.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Laravel\Fortify\Contracts\UpdatesUserProfileInformation  $updater
     * @return \Illuminate\Http\Response
     */
    public function update(
        Request $request,
        User $user,
        UpdatesUserProfileInformation $updater
    ) {
        $updater->update($user, $request->all());
        return $request->wantsJson()
            ? new JsonResponse(200)
            : back()->with('status', 'profile-information-updated');
    }
}
