<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePropertiesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('properties', function (Blueprint $table) {
            $table->increments('id');

            $table->string('type')->nullable();
            $table->string('geo_type')->nullable();
            $table->string('geo_coordinates')->nullable();
            $table->integer('lat')->nullable();
            $table->integer('long')->nullable();
            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->string('food_type')->nullable();
            $table->string('item_type')->nullable();
            $table->string('parking_type')->nullable();
            $table->string('seated_cap')->nullable();
            $table->string('standing_cap')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('properties');
	}

}
