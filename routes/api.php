<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MembreController;
use App\Http\Controllers\AnnonceController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\villeController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
    Route::post('/membreStore',[MembreController::class,'store']);
    Route::get('/membreIndex',[MembreController::class,'index']);
    Route::get('/membres/{id}',[MembreController::class,'show']);
    
    Route::get('/annonceIndex', [AnnonceController::class,'index']);
    Route::post('/annonceStore', [AnnonceController::class,'store']);
    Route::resource('/categorie', CategorieController::class);
    Route::resource('/ville', villeController::class);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
