<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Http\Responses\PasswordUpdateResponse;
use Laravel\Fortify\Contracts\UpdatesUserPasswords;
use App\Models\User;

class UserPasswordController extends Controller
{
    /**
     * Update the user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Laravel\Fortify\Contracts\UpdatesUserPasswords  $updater
     * @return \Laravel\Fortify\Contracts\PasswordUpdateResponse
     */
    public function update(Request $request, User $user, UpdatesUserPasswords $updater)
    {
        $updater->update($user, $request->all());

        return app(PasswordUpdateResponse::class);
    }
}
