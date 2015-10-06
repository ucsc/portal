<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMailstopsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('mailstops', function (Blueprint $table) {
            $table->increments('id');

            $table->string('type')->nullable();
            $table->string('geo_type')->nullable();
            $table->string('geo_coordinates')->nullable();
            $table->integer('lat')->nullable();
            $table->integer('long')->nullable();
            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('street')->nullable();
            $table->string('zip')->nullable();

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
		Schema::drop('mailstops');
	}

}
