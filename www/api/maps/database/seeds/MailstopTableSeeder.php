<?php

# database/seeds/MailstopTableSeeder.php

use App\Models\Mailstop;  
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class MailstopTableSeeder extends Seeder  
{
	public function run()
	{
		DB::table('mailstops')->delete();
 
		$mailstopsJson = File::get(storage_path() . "/jsondata/mailstops.json");
		$mailstop = json_decode($mailstopsJson);
		foreach ($mailstop as $object) {
			Mailstop::create(array(
				'type' => $object->type,
				'geo_type' => $object->geometry->type,
				'geo_coordinates' => $object->geometry->coordinates[0].','.$object->geometry->coordinates[1],
				'lat' => $object->geometry->coordinates[1],
				'long' => $object->geometry->coordinates[0],
				'name' => $object->properties->name,
				'description' => $object->properties->description,
				'city' => $object->properties->City,
				'state' => $object->properties->State,
				'street' => $object->properties->Street,
				'zip' => $object->properties->Zip,
			));
		}
	}

}
