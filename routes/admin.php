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
Route::group([
    'namespace' => 'App\Http\Controllers\Admin',
    'middleware' => ['auth:sanctum'],
    'as' => 'admin.',
], function () {
    Route::post('/logout', 'LoginController@destroy');
    Route::apiResource('/user', UserController::class);
    Route::put('/user/{user}/profile-information', 'UserProfileInformationController@update');
    Route::put('/user/{user}/password', 'UserPasswordController@update');
    Route::apiResource('/task', TaskController::class);
    Route::apiResource('/public_task', PublicTaskController::class);
    Route::post('/public_task/{public_task}/fix/{id}', 'PublicTaskController@fixPublicTask');
    Route::post('/public_task/{public_task}/cancel/{id}', 'PublicTaskController@cancelPublicTask');
    Route::get('/public_task/calendar/{this_month}', 'PublicTaskController@getTasksThisDate');
    Route::get('/task_name', 'TaskController@getTaskName');
    Route::get('/section_name', 'SectionController@getSectionName');
    Route::get('/time_grid/section', 'SectionController@getResourceTimeGridSection');
    Route::apiResource('/section', SectionController::class);
    Route::put('/password', 'PasswordController@update');
    Route::put('/profile-information', 'ProfileInformationController@update');
});
