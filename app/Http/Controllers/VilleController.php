<?php

namespace App\Http\Controllers;

use App\Models\Ville;
use Illuminate\Http\Request;

class VilleController extends Controller
{
    public function index()
    {
        $villes = Ville::all();

        return response()->json($villes,200);
    }

    public function store(Request $request)
    {
        $ville = Ville::create($request->all());

        return response()->json($ville, 201);
    }

    public function show($id)
    {
        $ville = Ville::findOrFail($id);

        return response()->json($ville);
    }

    public function update(Request $request, $id)
    {
        $ville = Ville::findOrFail($id);
        $ville->update($request->all());

        return response()->json($ville);
    }

    public function destroy($id)
    {
        $ville = Ville::findOrFail($id);
        $ville->delete();

        return response()->json(null, 204);
    }
}
