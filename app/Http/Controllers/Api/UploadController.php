<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    /**
     * Image upload for admins (site content, project previews).
     */
    public function image(Request $request): JsonResponse
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:png,jpg,jpeg,webp,gif,svg', 'max:8192'],
        ], [
            'file.mimes' => 'Unsupported file. Use PNG, JPG, WEBP, GIF or SVG under 8MB.',
            'file.max' => 'That image is larger than 8MB.',
        ]);

        return $this->store($request, 'uploads');
    }

    /**
     * CV upload for applicants (public, rate limited).
     */
    public function cv(Request $request): JsonResponse
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
        ], [
            'file.mimes' => 'Unsupported file. Upload a PDF or Word document under 5MB.',
            'file.max' => 'That file is larger than 5MB.',
        ]);

        return $this->store($request, 'cvs');
    }

    private function store(Request $request, string $folder): JsonResponse
    {
        $disk = Storage::disk(config('oluseed.uploads_disk'));
        $path = $disk->putFile($folder, $request->file('file'));

        return response()->json(['url' => $disk->url($path), 'path' => $path]);
    }
}
