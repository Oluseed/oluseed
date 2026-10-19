<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Exchange admin email + password for a Sanctum API token.
     *
     * The account defined by ADMIN_EMAIL / ADMIN_PASSWORD in .env is always
     * valid (it is created on first login and its hash re-synced when the
     * password changes). Any other users in the table authenticate against
     * their stored hash.
     */
    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $isConfiguredAdmin = strcasecmp($data['email'], (string) config('oluseed.admin_email')) === 0;

        if ($isConfiguredAdmin) {
            if (! hash_equals((string) config('oluseed.admin_password'), $data['password'])) {
                return $this->rejected();
            }

            $user = User::admin();
            if (! Hash::check($data['password'], $user->password)) {
                $user = User::admin(syncPassword: true);
            }
        } else {
            $user = User::where('email', $data['email'])->first();

            if (! $user || ! Hash::check($data['password'], $user->password)) {
                return $this->rejected();
            }
        }

        $token = $user->createToken('admin', ['*'], now()->addDays(7));

        return response()->json([
            'token' => $token->plainTextToken,
            'user' => ['name' => $user->name, 'email' => $user->email],
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json(['ok' => true, 'user' => ['name' => $user->name, 'email' => $user->email]]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json(['ok' => true]);
    }

    private function rejected(): JsonResponse
    {
        return response()->json(['error' => 'Incorrect email or password'], 401);
    }
}
