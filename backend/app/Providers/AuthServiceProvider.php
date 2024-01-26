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
        // Write the Passport keys to storage
        if (!file_exists(storage_path('oauth-private.key'))) {
            file_put_contents(storage_path('oauth-private.key'), str_replace('\\n', "\n", env('PASSPORT_PRIVATE_KEY')));
        }

        if (!file_exists(storage_path('oauth-public.key'))) {
            file_put_contents(storage_path('oauth-public.key'), str_replace('\\n', "\n", env('PASSPORT_PUBLIC_KEY')));
        }

        Passport::loadKeysFrom(storage_path());

        Passport::routes();
        Passport::personalAccessTokensExpireIn(now()->addDays(3));
    }
}