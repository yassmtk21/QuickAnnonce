<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('membres', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('name');
            $table->string('prenom');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('tele');
            $table->enum('genre', ['homme', 'femme', 'autre']);
            $table->date('date_inscription');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('membres');
    }
};
