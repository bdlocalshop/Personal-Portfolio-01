<?php

namespace App\Filament\Resources\Inquiries\Schemas;

use App\Enums\InquiryStatus;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class InquiryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                TextInput::make('service_interested')
                    ->required(),
                TextInput::make('budget_range')
                    ->required(),
                Textarea::make('message')
                    ->required()
                    ->columnSpanFull(),
                Select::make('status')
                    ->options(InquiryStatus::class)
                    ->default('new')
                    ->required(),
                TextInput::make('ip_address'),
            ]);
    }
}
