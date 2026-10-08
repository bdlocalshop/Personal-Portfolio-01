<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * Every seeder called here must be idempotent (safe to re-run).
     * The admin user for Filament is created in Phase 2 via
     * `php artisan make:filament-user`.
     */
    public function run(): void
    {
        $this->call([
            ProjectSeeder::class,
        ]);
    }
}
