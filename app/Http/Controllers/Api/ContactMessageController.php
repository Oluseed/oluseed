<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ContactMessageController extends Controller
{
    /**
     * Public: contact form submission.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:200'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        ContactMessage::create($data);

        return response()->json(['ok' => true], 201);
    }

    public function index(): AnonymousResourceCollection
    {
        return ContactMessageResource::collection(ContactMessage::latest()->get());
    }

    public function update(Request $request, ContactMessage $message): ContactMessageResource
    {
        $data = $request->validate([
            'read' => ['required', 'boolean'],
        ]);

        $message->update($data);

        return new ContactMessageResource($message);
    }

    public function destroy(ContactMessage $message): JsonResponse
    {
        $message->delete();

        return response()->json(['ok' => true]);
    }
}
