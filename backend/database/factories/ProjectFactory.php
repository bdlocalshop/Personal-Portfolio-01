<?php

namespace Database\Factories;

use App\Enums\ProjectCategory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    public function definition(): array
    {
        $title = Str::title($this->faker->unique()->words(2, true));

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.$this->faker->unique()->numberBetween(100, 99999),
            'category' => $this->faker->randomElement(ProjectCategory::cases()),
            'tagline' => $this->faker->sentence(6),
            'client_region' => $this->faker->randomElement(['United States', 'United Kingdom', 'Germany', null]),
            'featured_image' => 'projects/'.Str::slug($title).'.webp',
            'overview' => $this->faker->paragraph(),
            'challenges_solutions' => $this->faker->paragraph(),
            'results_metrics' => [
                ['metric' => $this->faker->randomFloat(1, 0.3, 1.5).'s Average', 'label' => 'Load Speed'],
                ['metric' => $this->faker->randomFloat(2, 99, 99.99).'% Uptime', 'label' => 'Availability'],
            ],
            'tech_stack' => $this->faker->randomElements(
                ['Next.js', 'Laravel API', 'Tailwind CSS', 'Redis', 'React Native', 'Expo', 'Framer Motion'],
                3
            ),
            'live_preview_url' => $this->faker->optional()->url(),
            'github_url' => $this->faker->optional()->url(),
            'is_featured' => $this->faker->boolean(30),
            'order' => $this->faker->numberBetween(0, 100),
        ];
    }

    public function featured(): static
    {
        return $this->state(fn () => ['is_featured' => true]);
    }
}
