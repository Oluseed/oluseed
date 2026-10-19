<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    /**
     * Public: newsletter signup from the footer.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'max:200'],
        ]);

        Subscriber::firstOrCreate(['email' => strtolower($data['email'])]);

        return response()->json(['ok' => true], 201);
    }

    public function index(): JsonResponse
    {
        return response()->json(
            Subscriber::latest()->get(['id', 'email', 'created_at'])->map(fn ($s) => [
                'id' => $s->id,
                'email' => $s->email,
                'createdAt' => $s->created_at?->toIso8601String(),
            ]),
        );
    }

    public function destroy(Subscriber $subscriber): JsonResponse
    {
        $subscriber->delete();

        return response()->json(['ok' => true]);
    }
}
