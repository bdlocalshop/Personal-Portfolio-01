<?php

namespace Database\Factories;

use App\Enums\InquiryStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Inquiry>
 */
class InquiryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->safeEmail(),
            'service_interested' => $this->faker->randomElement([
                'Web App Development & Architecture',
                'UI/UX & Digital Product Design',
                'Cross-Platform Mobile Applications',
            ]),
            'budget_range' => $this->faker->randomElement(['< $5k', '$5k - $15k', '$15k - $50k', '$50k+']),
            'message' => $this->faker->paragraph(),
            'ip_address' => $this->faker->ipv4(),
        ];
    }

    public function status(InquiryStatus $status): static
    {
        // status is guarded on the model, so force it via afterMaking.
        return $this->afterMaking(fn ($inquiry) => $inquiry->status = $status);
    }
}
