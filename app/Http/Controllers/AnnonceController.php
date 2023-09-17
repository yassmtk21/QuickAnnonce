<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Annonce;
use App\Models\Categorie;
use App\Models\Ville;
use Illuminate\Support\Facades\Storage; // Move the "use" statement here

class AnnonceController extends Controller
{
    // Your controller methods here...


    public function index()
    {
        $annonce = Annonce::all(); 
        return response()->json($annonce, 200);
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'votre_nom' => 'required',
            'email' => 'required|email',
            'tele' => 'required',
            'id_categorie' => 'required',
            'id_ville' => 'required',
            'titre' => 'required',
            'description' => 'required',
            'date_publication' => 'required|date',
            'prix' => 'required',
            'photos' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'nullable',
        ]);
        

        $annonce = new Annonce();
        $annonce->votre_nom = $validatedData['votre_nom'];
        $annonce->email = $validatedData['email'];
        $annonce->tele = $validatedData['tele'];
        $annonce->id_categorie = $validatedData['id_categorie'];
        $annonce->id_ville = $validatedData['id_ville'];
        $annonce->titre = $validatedData['titre'];
        $annonce->description = $validatedData['description'];
        $annonce->date_publication = $validatedData['date_publication'];
        $annonce->prix = $validatedData['prix'];
        $annonce->status = $validatedData['status'];

        if ($request->hasFile('photos')) {
            $photos = $request->file('photos');
            $CheminImage = time() . '_' . $photos->getClientOriginalName();
            $photos->move(public_path('images'), $CheminImage);

            $annonce->photos = $CheminImage;
        }
        $annonce->save();
        
    
        return response()->json($annonce, 201);
    }
    
    public function show($id)
    {
        $annonce = Annonce::with('categorie', 'ville')->find($id);

        if (!$annonce) {
            return response()->json(['error' => 'Annonce not found'], 404);
        }

        return response()->json($annonce, 200);
    }
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'votre_nom' => 'exists:membres,id',
            'email' => 'email',
            'tele' => 'string',
            'id_categorie' => 'exists:categories,id',
            'id_ville' => 'exists:villes,id',
            'titre' => 'string',
            'description' => 'string',
            'date_publication' => 'date',
            'prix' => 'numeric',
            'photos' => 'nullable',
            'status' => 'string',
        ]);

        $annonce = Annonce::find($id);

        if (!$annonce) {
            return response()->json(['error' => 'Annonce not found'], 404);
        }

        $annonce->fill($validatedData);
        $annonce->save();

        return response()->json($annonce, 200);
    }
    public function destroy($id)
    {
        $annonce = Annonce::find($id);

        if (!$annonce) {
            return response()->json(['error' => 'Annonce not found'], 404);
        }

        $annonce->delete();

        return response()->json(['message' => 'Annonce deleted successfully'], 200);
    }



}
