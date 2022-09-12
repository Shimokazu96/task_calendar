<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return Auth::guard('web')
        ->user();
});
Route::get('/reflesh-token', function (Illuminate\Http\Request $request) {
    $request->session()->regenerateToken();

    return response()->json();
});

// admin ログイン認証後
Route::group([
    'namespace' => 'App\Http\Controllers\User',
    'middleware' => ['auth:sanctum']
], function () {
    Route::put('/user/profile-information', 'ProfileInformationController@update')->name('user-profile-information.update');
    Route::apiResource('/public_task', PublicTaskController::class);
    Route::get('/public_task/calendar/{this_date}', 'PublicTaskController@getTasksThisDate');
    Route::post('/public_task/apply/{public_task}', 'PublicTaskController@applyPublicTask');
    Route::post('/public_task/cancel/{public_task}', 'PublicTaskController@cancelPublicTask');
    Route::post('/public_task/complete/{public_task}', 'PublicTaskController@completePublicTask');
    Route::get('/time_grid/section', 'SectionController@getResourceTimeGridSection');

    Route::get('/user/applied/public_task', 'UserController@appliedPublicTask');
    Route::get('/user/fixed/public_task', 'UserController@fixedPublicTask');
});

