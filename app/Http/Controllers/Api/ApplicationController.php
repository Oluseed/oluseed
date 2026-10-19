<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApplicationResource;
use App\Models\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ApplicationController extends Controller
{
    /**
     * Public: submit a job application from the careers page.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:200'],
            'type' => ['nullable', Rule::in(Application::TYPES)],
            'jobId' => ['nullable', 'string', 'max:80'],
            'jobTitle' => ['nullable', 'string', 'max:160'],
            'phone' => ['nullable', 'string', 'max:40'],
            'portfolio' => ['nullable', 'string', 'max:300'],
            'coverLetter' => ['nullable', 'string', 'max:5000'],
            'cvUrl' => ['nullable', 'string', 'max:300'],
        ]);

        $application = Application::create([
            'type' => $data['type'] ?? 'job',
            'job_id' => $data['jobId'] ?? null,
            'job_title' => $data['jobTitle'] ?: (($data['type'] ?? 'job') === 'internship' ? 'General internship application' : 'General application'),
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'portfolio' => $data['portfolio'] ?? null,
            'cover_letter' => $data['coverLetter'] ?? null,
            'cv_path' => $this->pathFromUrl($data['cvUrl'] ?? ''),
        ]);

        return response()->json(['ok' => true, 'id' => $application->id], 201);
    }

    public function index(): AnonymousResourceCollection
    {
        return ApplicationResource::collection(Application::latest()->get());
    }

    public function update(Request $request, Application $application): ApplicationResource
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(Application::STATUSES)],
        ]);

        $application->update($data);

        return new ApplicationResource($application);
    }

    public function destroy(Application $application): JsonResponse
    {
        if ($application->cv_path) {
            Storage::disk(config('oluseed.uploads_disk'))->delete($application->cv_path);
        }

        $application->delete();

        return response()->json(['ok' => true]);
    }

    /**
     * Only accept CV references that point at our own uploads disk.
     */
    private function pathFromUrl(string $url): ?string
    {
        if ($url === '') {
            return null;
        }

        $disk = Storage::disk(config('oluseed.uploads_disk'));
        $base = rtrim($disk->url(''), '/');
        $path = str_starts_with($url, $base) ? ltrim(substr($url, strlen($base)), '/') : null;

        return $path && str_starts_with($path, 'cvs/') && $disk->exists($path) ? $path : null;
    }
}
