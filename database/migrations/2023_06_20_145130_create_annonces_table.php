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
        Schema::create('annonces', function (Blueprint $table) {
            $table->id();
            $table->string('votre_nom');
            $table->string('email');
            $table->string('tele');
            $table->unsignedBigInteger('id_categorie');
            $table->foreign('id_categorie')->references('id')->on('categories');
            $table->unsignedBigInteger('id_ville');
            $table->foreign('id_ville')->references('id')->on('villes');
            $table->string('titre');
            $table->string('description');
            $table->date('date_publication');
            $table->decimal('prix',8,2);
            $table->string('photos')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annonces');
    }
};
