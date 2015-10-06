<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBusroutesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('busroutes', function (Blueprint $table) {
            $table->increments('id');

            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->binary('outline')->nullable();
           

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
		Schema::drop('busroutes');
	}

}
