<?php

namespace App\Http\Controllers;

use App\Http\Requests\TicketRequest;
use App\Models\People;
use App\Models\Tickets;
use Illuminate\Http\Request;

class TicketsController extends Controller
{
    public function index() {
        $tickets = Tickets::with("people")->get();
        return response()->json($tickets);
    }

    public function create(TicketRequest $req) {
        $ticket = new Tickets();
        $ticket->prefix = $req->get("prefix");
        $ticket->price = $req->get("price");
        $ticket->release_date = $req->get("release_date");
        $ticket->max_usages = $req->get("max_usages");
        $ticket->save();
        return response()->json($ticket);
    }

    public function update(Tickets $ticket, TicketRequest $req) {
        $currentUsage = People::select(["people.*"])
                        ->Where("ticket_id", $req->get("ticket_id"))
                        ->count();
        if (
            intval($currentUsage) == intval($req->get("max_usages")) ||
            intval($currentUsage) > intval($req->get("max_usages"))
        ) {
            return response("A jegy elérte a maximum felhasználhatóságot",
                            400);
        }
        $ticket->prefix = $req->get("prefix");
        $ticket->price = $req->get("price");
        $ticket->release_date = $req->get("release_date");
        $ticket->max_usages = $req->get("max_usages");
        $ticket->save();
        return response()->json($ticket);
    }

    public function delete(Tickets $ticket) {
        $ticket->delete();
        return response()->json($ticket);
    }
}
