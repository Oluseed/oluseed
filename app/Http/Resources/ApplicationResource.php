<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ApplicationResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type ?? 'job',
            'jobId' => $this->job_id ?? '',
            'jobTitle' => $this->job_title,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone ?? '',
            'portfolio' => $this->portfolio ?? '',
            'coverLetter' => $this->cover_letter ?? '',
            'cvUrl' => $this->cv_path ? Storage::disk(config('oluseed.uploads_disk'))->url($this->cv_path) : '',
            'status' => $this->status,
            'createdAt' => $this->created_at?->toIso8601String(),
        ];
    }
}
