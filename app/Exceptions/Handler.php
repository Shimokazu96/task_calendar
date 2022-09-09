<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Session\TokenMismatchException;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];
    public function render($request, Throwable $exception)
    {
        // Tokenエラー(419)の時のメッセージ
        if ($exception instanceof TokenMismatchException) {
            throw new \Exception('ページの有効期限が切れました。');
        }

        return parent::render($request, $exception);
    }
    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->renderable(function (HttpException $e, $request) {
            if ($request->is('api/*')) {
                $title = '';
                $detail = '';

                switch ($e->getStatusCode()) {
                    case 401:
                        $title = __('Unauthorized');
                        $detail =  __('Unauthorized');
                        break;
                    case 403:
                        $title = __('Forbidden');
                        $detail = __($e->getMessage() ?: 'Forbidden');
                        break;
                    case 404:
                        $title = __('Not Found');
                        $detail = __('Not Found');
                        break;
                    case 419:
                        $title = __('Page Expired');
                        $detail = __('Page Expired');
                        break;
                    case 429:
                        $title = __('Too Many Requests');
                        $detail = __('Too Many Requests');
                        break;
                    case 500:
                        $title = __('Server Error');
                        $detail = __('Server Error');
                        break;
                    case 503:
                        $title = __('Service Unavailable');
                        $detail = __('Service Unavailable');
                        break;
                    default:
                        return;
                }

                return response()->json([
                    'title' => $title,
                    'status' => $e->getStatusCode(),
                    'detail' => $detail,
                ], $e->getStatusCode(), [
                    'Content-Type' => 'application/problem+json',
                ]);
            }
        });
    }
}
