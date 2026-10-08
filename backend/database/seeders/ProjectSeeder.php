<?php

namespace Database\Seeders;

use App\Enums\ProjectCategory;
use App\Models\Project;
use Illuminate\Database\Seeder;

/**
 * Seeds the 3 flagship case studies from PRD.txt §6.
 *
 * Idempotent: rows are keyed by slug via updateOrCreate, so re-running
 * the seeder refreshes content instead of duplicating it.
 */
class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->projects() as $project) {
            Project::updateOrCreate(
                ['slug' => $project['slug']],
                $project,
            );
        }
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function projects(): array
    {
        return [
            [
                'title' => 'ApexPulse',
                'slug' => 'apexpulse',
                'category' => ProjectCategory::WebDev,
                'tagline' => 'Real-Time Performance Analytics & Monitoring Dashboard',
                'client_region' => 'United States',
                'featured_image' => 'projects/apexpulse.webp',
                'overview' => 'A high-throughput telemetry analytics platform capable of streaming live event feeds with zero interface freeze.',
                'challenges_solutions' => 'Refactored legacy REST polling into WebSockets coupled with a headless Next.js frontend, reducing bandwidth consumption by 65%.',
                'results_metrics' => [
                    ['metric' => '0.6s Average', 'label' => 'Load Speed'],
                    ['metric' => '+65% Engagement', 'label' => 'Session Length'],
                    ['metric' => '99.98% Uptime', 'label' => 'Availability'],
                ],
                'tech_stack' => ['Next.js', 'Laravel API', 'Redis', 'Tailwind CSS', 'Chart.js'],
                'live_preview_url' => null,
                'github_url' => null,
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'title' => 'NovaPay',
                'slug' => 'novapay',
                'category' => ProjectCategory::MobileApp,
                'tagline' => 'Cross-Platform Borderless Digital Wallet & Remittance App',
                'client_region' => 'United Kingdom',
                'featured_image' => 'projects/novapay.webp',
                'overview' => 'A multi-currency mobile wallet supporting cross-border payments, instant peer-to-peer transfers, and offline transaction queues.',
                'challenges_solutions' => 'Implemented secure biometric authentication along with an encrypted SQLite local cache for seamless offline transactions.',
                'results_metrics' => [
                    ['metric' => '4.9 / 5.0 (1,200+ Reviews)', 'label' => 'App Rating'],
                    ['metric' => '< 150ms', 'label' => 'Biometric Latency'],
                    ['metric' => 'Zero critical vulnerabilities', 'label' => 'Security'],
                ],
                'tech_stack' => ['React Native', 'Expo', 'Laravel Sanctum', 'Node.js'],
                'live_preview_url' => null,
                'github_url' => null,
                'is_featured' => true,
                'order' => 2,
            ],
            [
                'title' => 'Lumina Studio',
                'slug' => 'lumina-studio',
                'category' => ProjectCategory::UiUx,
                'tagline' => 'High-Converting Headless E-Commerce Brand Storefront',
                'client_region' => 'Germany',
                'featured_image' => 'projects/lumina-studio.webp',
                'overview' => 'End-to-end design system and headless storefront built for a luxury lifestyle retailer to eliminate mobile checkout friction.',
                'challenges_solutions' => 'Designed a modular checkout drawer and progressive image rendering pipeline, minimizing mobile bounce rates.',
                'results_metrics' => [
                    ['metric' => '+38% Increase', 'label' => 'Checkout Conversion'],
                    ['metric' => '98/100 Mobile', 'label' => 'Lighthouse Score'],
                    ['metric' => '1.2s Completion', 'label' => 'Checkout Path'],
                ],
                'tech_stack' => ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Stripe', 'Headless CMS'],
                'live_preview_url' => null,
                'github_url' => null,
                'is_featured' => true,
                'order' => 3,
            ],
        ];
    }
}
