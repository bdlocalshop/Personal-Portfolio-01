<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\InquiryStatus;
use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InquiryController extends Controller
{
    /**
     * POST /api/v1/inquiries
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'service_interested' => ['required', 'string', 'max:100'],
            'budget_range' => ['required', 'string', 'max:100'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $inquiry = Inquiry::create([
            ...$validated,
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'message' => 'Thank you! Your inquiry has been received. I will get back to you within 24 hours.',
            'data' => [
                'id' => $inquiry->id,
                'status' => $inquiry->status->value,
                'created_at' => $inquiry->created_at->toIso8601String(),
            ],
        ], 201);
    }
}
