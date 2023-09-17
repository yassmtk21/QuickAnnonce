<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Membre;
use Validator;

class MembreController extends Controller
{
    //
    public function index(){
        $members=Membre::all();
        if($members==null){
            return response()->json(['message'=>'aucun membere']);
        }
        return response()->json([$members],200);
    }
    public function store(Request $request){
        $validator=Validator::make($request->all(),[
            'username'=>'required',
            'name'=>'required',
            'prenom'=>'required',
            'email'=>'required|email',
            'password'=>'required',
            'genre'=>'required',
        ]);
        if($validator->fails()){
            return response()->json(['err'=>$validator->errors()],401);
        }
        $input=$request->all();
        $input['password']=bcrypt($input['password']);;
        $membre=Membre::create($input);
        return response()
            ->json(['success'=>'Register successfully',
                    'membre'=>$membre,
        ],200);
    }
    public function show($id){
        $membre=Membre::findOrFail($id);
        return response()->json([
            'membre'=>$membre,
        ],200);
    }
    public function destroy($id){
        $membre=Membre::findOrFail($id);
        $membre->delete();
        return response()->json([
            'message'=>'membre bien supprime',
        ],200);
    }
}
