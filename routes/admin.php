<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/********************************************************************
 *
 * Admin
 *
 ********************************************************************/
// 認証不要
Route::get('/reflesh-token', function (Illuminate\Http\Request $request) {
    $request->session()
        ->regenerateToken();

    return response()->json();
});

// admin ログイン認証前
Route::controller(App\Http\Controllers\Admin\LoginController::class)
    ->group(function () {
        Route::post('/login', 'store');
        Route::post('/register', 'store');
    });

// ログインチェック
Route::middleware('auth:sanctum')->get('/', function (Request $request) {
    return Auth::guard('admin')
        ->user();
});
// admin ログイン認証後
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', 'App\Http\Controllers\Admin\LoginController@destroy');
});
