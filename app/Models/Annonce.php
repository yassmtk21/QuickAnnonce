<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Annonce extends Model
{
    use HasFactory;
    protected $fillable=[
        'votre_nom',
        'email',
        'tele',
        'id_categorie',
        'id_ville',
        'titre',
        'description',
        'date_publication',
        'prix',
        'photos',
        'status',
    ];
}
