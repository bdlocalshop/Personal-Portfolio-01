<?php

namespace Tests\Feature;

use App\Models\Inquiry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InquiryApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_submit_valid_inquiry(): void
    {
        $payload = [
            'name' => 'Sarah Connor',
            'email' => 'sarah@skynet-defense.com',
            'service_interested' => 'Web App Development & Architecture',
            'budget_range' => '$15k - $50k',
            'message' => 'Need an enterprise resilient API and dashboard.',
        ];

        $response = $this->postJson('/api/v1/inquiries', $payload);

        $response->assertCreated()
            ->assertJsonPath('data.status', 'new')
            ->assertJsonStructure([
                'message',
                'data' => [
                    'id',
                    'status',
                    'created_at',
                ],
            ]);

        $this->assertDatabaseHas('inquiries', [
            'name' => 'Sarah Connor',
            'email' => 'sarah@skynet-defense.com',
            'service_interested' => 'Web App Development & Architecture',
            'budget_range' => '$15k - $50k',
            'status' => 'new',
        ]);
    }

    public function test_inquiry_validation_fails_with_missing_fields(): void
    {
        $response = $this->postJson('/api/v1/inquiries', []);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'email', 'service_interested', 'budget_range', 'message']);
    }

    public function test_inquiry_validation_fails_with_invalid_email(): void
    {
        $payload = [
            'name' => 'John Doe',
            'email' => 'not-an-email',
            'service_interested' => 'UI/UX Design',
            'budget_range' => '< $5k',
            'message' => 'Test message',
        ];

        $response = $this->postJson('/api/v1/inquiries', $payload);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['email']);
    }
}
