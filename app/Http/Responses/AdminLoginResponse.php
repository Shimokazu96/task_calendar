<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Fortify;
use Illuminate\Validation\ValidationException;

class AdminLoginResponse implements LoginResponseContract {
    /**
     * Create an HTTP response that represents the object.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse( $request ) {
        $admin = Auth::guard( 'admin' )
            ->user();

        return $request->wantsJson() ? response()->json( $admin, 200 ) : redirect()->intended( Fortify::redirects( 'login' ) );
    }
}
