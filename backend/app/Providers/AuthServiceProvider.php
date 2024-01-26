<?php

namespace App\Providers;

use Laravel\Passport\Passport;
// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy'
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
        // Write the Passport keys to a temporary directory
        $privateKeyPath = sys_get_temp_dir() . '/oauth-private.key';
        $publicKeyPath = sys_get_temp_dir() . '/oauth-public.key';

        if (!file_exists($privateKeyPath)) {
            file_put_contents($privateKeyPath, str_replace('\\n', "\n", env('PASSPORT_PRIVATE_KEY')));
        }

        if (!file_exists($publicKeyPath)) {
            file_put_contents($publicKeyPath, str_replace('\\n', "\n", env('PASSPORT_PUBLIC_KEY')));
        }

        Passport::loadKeysFrom(sys_get_temp_dir());
        Passport::personalAccessTokensExpireIn(now()->addDays(3));
    }
}