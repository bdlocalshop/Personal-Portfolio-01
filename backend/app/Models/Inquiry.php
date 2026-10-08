<?php

namespace App\Models;

use App\Enums\InquiryStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    /** @use HasFactory<\Database\Factories\InquiryFactory> */
    use HasFactory;

    /**
     * `status` is intentionally not mass-assignable so public submissions
     * cannot set it; it defaults to "new" and is managed via the CMS.
     */
    protected $fillable = [
        'name',
        'email',
        'service_interested',
        'budget_range',
        'message',
        'ip_address',
    ];

    protected $attributes = [
        'status' => 'new',
    ];

    protected function casts(): array
    {
        return [
            'status' => InquiryStatus::class,
        ];
    }
}
