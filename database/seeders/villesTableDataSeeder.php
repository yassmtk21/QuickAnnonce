<?php

namespace Database\Seeders;
use App\Models\Ville;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class villesTableDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ville::create([
            'nom'=>'Khouribga'
        ]);
        Ville::create([
            'nom'=>'Casablanca'
        ]);
        Ville::create([
            'nom'=>'Fez'
        ]);
        Ville::create([
            'nom'=>'Rabat'
        ]);
        Ville::create([
            'nom'=>'Tangier'
        ]);
        Ville::create([
            'nom'=>'Marrakesh'
        ]);
        Ville::create([
            'nom'=>'Salé'
        ]);
        Ville::create([
            'nom'=>'Agadir'
        ]);
        Ville::create([
            'nom'=>'Oujda'
        ]);
        Ville::create([
            'nom'=>'Meknes'
        ]);
        Ville::create([
            'nom'=>'Kenitra'
        ]);
        Ville::create([
            'nom'=>'Tetouan'
        ]);
        Ville::create([
            'nom'=>'Safi'
        ]);
        Ville::create([
            'nom'=>'Temara'
        ]);
        Ville::create([
            'nom'=>'Mohammedia'
        ]);
        Ville::create([
            'nom'=>'El Jadida'
        ]);
        Ville::create([
            'nom'=>'Beni Mellal'
        ]);
        Ville::create([
            'nom'=>'Aït Melloul'
        ]);
        Ville::create([
            'nom'=>'Settat'
        ]);
        Ville::create([
            'nom'=>'Dar Bouazza'
        ]);
        Ville::create([
            'nom'=>'Berrechid'
        ]);
        Ville::create([
            'nom'=>'Khemisset'
        ]);
        Ville::create([
            'nom'=>'Inezgane'
        ]);
        Ville::create([
            'nom'=>'Taza'
        ]);
        Ville::create([
            'nom'=>'Guelmim'
        ]);
        Ville::create([
            'nom'=>'Al Hoceima'
        ]);
        Ville::create([
            'nom'=>'Sidi Bennour'
        ]);
        Ville::create([
            'nom'=>'Berkane'
        ]);
        Ville::create([
            'nom'=>'Benslimane'
        ]);
        Ville::create([
            'nom'=>'	Azrou'
        ]);
    }
}
