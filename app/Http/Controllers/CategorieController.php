<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categorie;

class CategorieController extends Controller
{
    //
    public function index()
    {
        $categories = Categorie::all();

        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $category = Categorie::create($request->all());

        return response()->json($category, 201);
    }

    public function show($id)
    {
        $category = Categorie::findOrFail($id);

        return response()->json($category);
    }

    public function update(Request $request, $id)
    {
        $category = Categorie::findOrFail($id);
        $category->update($request->all());

        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = Categorie::findOrFail($id);
        $category->delete();

        return response()->json(null, 204);
    }
}
