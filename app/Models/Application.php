<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory, HasUlids;

    public const STATUSES = ['new', 'reviewed', 'shortlisted', 'rejected'];

    public const TYPES = ['job', 'internship'];

    protected $fillable = [
        'type',
        'job_id',
        'job_title',
        'name',
        'email',
        'phone',
        'portfolio',
        'cover_letter',
        'cv_path',
        'status',
    ];
}
