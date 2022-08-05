<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Fortify;
use Illuminate\Validation\ValidationException;

class LoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        $user = Auth::guard('web')->user();
        return $request->wantsJson()
            ? response()->json($user, 200)
            : redirect()->intended(Fortify::redirects('login'));
    }
}
