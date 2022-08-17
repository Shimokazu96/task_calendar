<?php

namespace App\Actions\Admin;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\UpdatesUserPasswords;

class UpdateAdminPassword implements UpdatesUserPasswords
{
    use PasswordValidationRules;

    /**
     * Validate and update the user's password.
     *
     * @param  mixed  $admin
     * @param  array  $input
     * @return void
     */
    public function update($admin, array $input)
    {
        Validator::make($input, [
            'current_password' => ['required', 'string'],
            'password' => $this->passwordRules(),
        ])->after(function ($validator) use ($admin, $input) {
            if (!isset($input['current_password']) || !Hash::check($input['current_password'], $admin->password)) {
                $validator->errors()->add('current_password', __('入力されたパスワードが現在のパスワードと一致しません。'));
            }
        })->validateWithBag('updatePassword');

        $admin->forceFill([
            'password' => Hash::make($input['password']),
        ])->save();
    }
}
