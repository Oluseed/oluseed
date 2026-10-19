<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * The admin account defined by ADMIN_EMAIL / ADMIN_PASSWORD.
     * Created on first use; the password hash is synced from config.
     */
    public static function admin(bool $syncPassword = false): self
    {
        $user = static::firstOrCreate(
            ['email' => config('oluseed.admin_email')],
            ['name' => 'Oluseed Admin', 'password' => config('oluseed.admin_password')],
        );

        if ($syncPassword) {
            $user->forceFill(['password' => config('oluseed.admin_password')])->save();
        }

        return $user;
    }
}
