<?php

namespace Database\Seeders;

use App\Models\Tickets;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class TicketsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $arr = [
            [
                'id' => 1,
                'prefix' => 'DarkWebxx',
                'price' => 32000,
                'release_date' => Carbon::parse("2019-12-01"),
                'max_usages' => 5
            ],
            [
                'id' => 2,
                'prefix' => 'PronHUBx',
                'price' => 12110,
                'release_date' => Carbon::parse("2021-12-01"),
                'max_usages' => 2
            ],
            [
                'id' => 3,
                'prefix' => 'AnotherPornHUBxx',
                'price' => 13202,
                'release_date' => Carbon::parse("2014-04-15"),
                'max_usages' => 1
            ]
        ];

        foreach ($arr as $item) {
            $ticket = Tickets::firstOrNew([
                'id' => $item['id'],
            ]);

            foreach ($item as $key => $value) {
                $ticket->{$key} = $value;
            }
            ;
            
            $ticket->save();
        }
    }
}
