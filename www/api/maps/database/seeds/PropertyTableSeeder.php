<?php

# database/seeds/PropertyTableSeeder.php

use App\Models\Property;  
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class PropertyTableSeeder extends Seeder  
{
	public function run()
	{
		DB::table('properties')->delete();
 
		$propertiesJson = File::get(storage_path() . "/jsondata/properties.json");
		$property = json_decode($propertiesJson);
		foreach ($property as $object) {
			Property::create(array(
				'type' => $object->type,
				'geo_type' => $object->geometry->type,
				'geo_coordinates' => $object->geometry->coordinates[0].','.$object->geometry->coordinates[1],
				'lat' => $object->geometry->coordinates[1],
				'long' => $object->geometry->coordinates[0],
				'name' => $object->properties->name,
				'description' => $object->properties->description,
				'food_type' => $object->properties->{'Food Type'},
				'item_type' => $object->properties->{'Item Type'},
				'parking_type' => $object->properties->{'Parking Type'},
				'seated_cap' => $object->properties->{'Seated Capacity'},
				'standing_cap' => $object->properties->{'Standing Capacity'},
			));
		}
	}

}
