<?php

use App\Models\Property;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

$app->get('/', function() use ($app) {
    return $app->welcome();
});

// $app->group(['prefix' => 'v1/properties'], function()
// {
//     $app->get('all', 'PropertiesController@all');
// });

$app->group(['prefix' => 'v1/properties'], function ($app) {
    $app->get('all', 'PropertiesController@all');
});

// $app->get('/properties/all', function() use ($app) {
//     return Property::all();
// });

// $app->get('/properties/classrooms', function() use ($app) {
//     return Property::where('item_type', '=', 'Classroom')->orderBy('name')->get();
// });

// $app->get('/properties/parking', function() use ($app) {
//     return Property::where('item_type', 'like', '%parking%')->orderBy('name')->get();
// });

// $app->get('/properties/transit', function() use ($app) {
//     return Property::where('item_type', 'like', '%transit%')->orderBy('name')->get();
// });

// $app->get('/properties/routestops', function() use ($app) {
//     $route1 = Property::where('item_type', 'like', '%transit%')->orderBy('name')->get();
//     Response::json(array('route1'=>$route1));
// });

// $app->get('/properties/search/{search}', function($search) use ($app) {
//     return Property::orderBy('name')
//     	->where('name', 'like', '% '.$search.'%')
//     	->orwhere('description', 'like', '% '.$search.'%')
//     	->orwhere('food_type', 'like', '% '.$search.'%')
//     	->orwhere('item_type', 'like', '% '.$search.'%')
//     	->orwhere('parking_type', 'like', '% '.$search.'%')
//     	->get();
// });