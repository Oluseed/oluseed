<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = ['name', 'email', 'message', 'read'];

    protected function casts(): array
    {
        return [
            'read' => 'boolean',
        ];
    }
}
