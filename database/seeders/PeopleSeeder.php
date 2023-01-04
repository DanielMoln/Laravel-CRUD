<?php

namespace Database\Seeders;

use App\Models\People;
use Illuminate\Database\Seeder;

class PeopleSeeder extends Seeder
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
                'name' => 'Kloé',
                'age' => 12,
                'ticket_id' => 2
            ],
            [
                'id' => 2,
                'name' => 'Gréta',
                'age' => 18,
                'ticket_id' => 1
            ],
            [
                'id' => 3,
                'name' => 'Sándor',
                'age' => 32,
                'ticket_id' => 2
            ],
        ];

        foreach ($arr as $item) {
            $human = People::firstOrNew([
                'id' => $item['id'],
            ]);

            foreach ($item as $key => $value) {
                $human->{$key} = $value;
            }
            ;
            
            $human->save();
        }
    }
}
