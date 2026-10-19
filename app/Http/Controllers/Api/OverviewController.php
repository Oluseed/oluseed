<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\ContactMessage;
use App\Models\SiteContent;
use App\Models\Subscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OverviewController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $content = SiteContent::current($request->query('locale'))->data;
        $jobs = collect($content['careers']['jobs'] ?? []);

        return response()->json([
            'projects' => count($content['projects'] ?? []),
            'openJobs' => $jobs->where('open', true)->count(),
            'openInternships' => collect($content['internships']['items'] ?? [])->where('open', true)->count(),
            'internshipApplications' => Application::where('type', 'internship')->count(),
            'applications' => Application::count(),
            'newApplications' => Application::where('status', 'new')->count(),
            'messages' => ContactMessage::count(),
            'unreadMessages' => ContactMessage::where('read', false)->count(),
            'products' => count($content['shop']['products'] ?? []),
            'posts' => count($content['blog']['posts'] ?? []),
            'subscribers' => Subscriber::count(),
        ]);
    }
}
