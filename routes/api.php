<?php

use App\Http\Controllers\PeopleController;
use App\Http\Controllers\TicketsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::group(['prefix' => '/people'], function () {
    Route::get("/", [PeopleController::class, "index"])->name("getPeople");
    Route::post("/create", [PeopleController::class, "create"])->name("createPeople");
    Route::put("/{ticket}", [PeopleController::class, "update"])->name("updatePeople");
    Route::delete("/{ticket}", [PeopleController::class, "delete"])->name("deletePeople");
});
Route::group(['prefix' => '/tickets'], function () {
    Route::get("/", [TicketsController::class, "index"])->name("getTickets");
    Route::post("/create", [TicketsController::class, "create"])->name("createTickets");
    Route::put("/{ticket}", [TicketsController::class, "update"])->name("updateTickets");
    Route::delete("/{ticket}", [TicketsController::class, "delete"])->name("deleteTickets");
});