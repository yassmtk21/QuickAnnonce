<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categorie;

class categoriesTableDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categorie::create([
            'libelle'=>'MULTIMEDIA'
        ]);
        Categorie::create([
            'libelle'=>'VEHICULES'
        ]);
        Categorie::create([
            'libelle'=>'IMMOBILIER'
        ]);
        Categorie::create([
            'libelle'=>'HABILLEMENT'
        ]);
        Categorie::create([
            'libelle'=>'LOISIRS'
        ]);
        Categorie::create([
            'libelle'=>'MAISON'
        ]);
        Categorie::create([
            'libelle'=>'EMPLOI_ET_SERVICES'
        ]);
    }
}
