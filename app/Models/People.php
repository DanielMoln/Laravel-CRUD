<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class People extends Model
{
    use HasFactory;
    public $timestamps = false;
    public function ticket() {
        return $this->belongsTo(Tickets::class, 
            'ticket_id', 'id');
    }
}
