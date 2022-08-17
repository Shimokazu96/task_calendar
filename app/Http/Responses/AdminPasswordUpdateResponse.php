<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Laravel\Fortify\Contracts\PasswordUpdateResponse as PasswordUpdateResponseContract;
// use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;

class AdminPasswordUpdateResponse implements PasswordUpdateResponseContract
{
    // use AuthenticatesUsers;
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();

        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logout'], 200);
        // return $request->wantsJson()
        //     ? new JsonResponse('', 200)
        //     : back()->with('status', 'password-updated');
    }
}
