<?php

namespace App\Http\Controllers;

use App\Http\Requests\PeopleRequest;
use App\Models\People;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PeopleController extends Controller
{
    public function index() {
        $people = People::with("ticket")->get();
        return response()->json($people);
    }

    public function create(PeopleRequest $req) {
        $maxUsage = DB::table("tickets")
                        ->select("max_usages")
                        ->where("id", $req->get("ticket_id"))
                        ->first();
        $currentUsage = People::select(["people.*"])
                        ->Where("ticket_id", $req->get("ticket_id"))
                        ->count();
        if (
            intval($currentUsage) == intval($maxUsage) ||
            intval($currentUsage) > intval($maxUsage)
        ) {
            return response("A jegy elérte a maximum felhasználhatóságot",
                            401);
        }

        $people = new People();
        if ($req->has("name")) {
            $people->name = $req->get("name");
        }
        if ($req->has("age")) {
            $people->age = $req->get("age");
        }
        if ($req->has("ticket_id")) {
            $people->ticket_id = $req->get("ticket_id");
        }

        $people->save();
        return response()->json($people->id);
    }

    public function update(People $people, PeopleRequest $req) {
        $maxUsage = DB::table("tickets")
                        ->select("max_usages")
                        ->where("id", $req->get("ticket_id"))
                        ->first();
        $currentUsage = People::select(["people.*"])
                        ->Where("ticket_id", $req->get("ticket_id"))
                        ->count();
        if (
            intval($currentUsage) == intval($maxUsage) ||
            intval($currentUsage) > intval($maxUsage)
        ) {
            return response("A jegy elérte a maximum felhasználhatóságot",
                            400);
        }

        $people = new People();
        if ($req->has("name")) {
            $people->name = $req->get("name");
        }
        if ($req->has("age")) {
            $people->age = $req->get("age");
        }
        if ($req->has("ticket_id")) {
            $people->ticket_id = $req->get("ticket_id");
        }

        $people->save();
        return response()->json($people);
    }

    public function delete(People $people) {
        $people->delete();
        return response()->json($people);
    }
}
