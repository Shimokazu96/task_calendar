<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Responses\AdminPasswordUpdateResponse;
use App\Actions\Admin\UpdateAdminPassword;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Laravel\Fortify\Contracts\UpdatesUserPasswords  $updater
     * @return \Laravel\Fortify\Contracts\PasswordUpdateResponse
     */
    public function update(Request $request, UpdateAdminPassword $updater)
    {
        $updater->update($request->user(), $request->all());

        return app(AdminPasswordUpdateResponse::class);
    }
}
