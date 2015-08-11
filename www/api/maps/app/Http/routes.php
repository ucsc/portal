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
//     // return Property::where('item_type', 'like', '%parking%')->orderBy('name')->get();

//     $lots = Property::where('item_type', 'like', '%parking%')->orderBy('name')->get();

//     $pljson['parking']['overlay'] = array('name' => 'Parking', 'type' => 'group', 'visible' => false);

//     $pljson['parking']['overlay']['layerParams'] = array('showOnSelector' => false);

//     $i = 0;

//     foreach($lots as $lot) {
//     	$pljson['makers']['pl'.$i] = array(
//     		'layer' => 'parking',
//     		'lat' => $lot->lat,
//     		'lng' => $lot->long,
//     		'message' => $lot->name
//     		);

//     	$i++;
//     }

//     return $pljson;
// });

$app->get('/properties/parking', function() use ($app) {
    // return Property::where('item_type', 'like', '%parking%')->orderBy('name')->get();

    $lots = Property::where('item_type', 'like', '%parking%')->orderBy('name')->get();

    $pljson['parking']['overlay'] = array('name' => 'Parking', 'type' => 'group', 'visible' => false);

    $pljson['parking']['overlay']['layerParams'] = array('showOnSelector' => false);

    $i = 0;

    foreach($lots as $lot) {
    	$pljson['parking']['markers']['pl'.$i] = array(
    		'layer' => 'parking',
    		'lat' => $lot->lat,
    		'lng' => $lot->long,
    		'message' => $lot->name,
            'focus' => false,
            'icon' => array(
                  'type' => 'extraMarker',
                  'icon' => 'fa-car',
                  'markerColor' => 'blue',
                  'prefix' => 'fa',
                  'shape' => 'square'
                )
    		);

    	$i++;
    }

    $rjson = json_encode($pljson, JSON_NUMERIC_CHECK);
    return $rjson;
});

$app->get('/properties/restrooms', function() use ($app) {
    // return Property::where('item_type', 'like', '%restroom%')->orderBy('name')->get();

    $lots = Property::where('item_type', 'like', '%restroom%')->orderBy('name')->get();

    $pljson['restrooms']['overlay'] = array('name' => 'Restrooms', 'type' => 'group', 'visible' => false);

    $pljson['restrooms']['overlay']['layerParams'] = array('showOnSelector' => false);

    $i = 0;

    foreach($lots as $lot) {
    	$pljson['restrooms']['markers']['rr'.$i] = array(
    		'layer' => 'restrooms',
    		'lat' => $lot->lat,
    		'lng' => $lot->long,
    		'message' => $lot->name,
            'focus' => false,
            'icon' => array(
                  'type' => 'extraMarker',
                  'icon' => 'fa-genderless',
                  'markerColor' => 'blue',
                  'prefix' => 'fa',
                  'shape' => 'star'
                )
            );

    	$i++;
    }

    $rjson = json_encode($pljson, JSON_NUMERIC_CHECK);
    return $rjson;
});

$app->get('/properties/transit', function() use ($app) {
    // return Property::where('item_type', 'like', '%restroom%')->orderBy('name')->get();

    $lots = Property::where('item_type', 'like', '%transit%')->orderBy('name')->get();

    $pljson['transit']['overlay'] = array('name' => 'Transit', 'type' => 'group', 'visible' => false);

    $pljson['transit']['overlay']['layerParams'] = array('showOnSelector' => false);

    $i = 0;

    foreach($lots as $lot) {
    	$pljson['transit']['markers']['ts'.$i] = array(
    		'layer' => 'transit',
    		'lat' => $lot->lat,
    		'lng' => $lot->long,
    		'message' => $lot->name,
            'focus' => false,
            'icon' => array(
                  'type' => 'extraMarker',
                  'icon' => 'fa-bus',
                  'markerColor' => 'blue',
                  'prefix' => 'fa',
                  'shape' => 'circle'
                )
            );

    	$i++;
    }

    $rjson = json_encode($pljson, JSON_NUMERIC_CHECK);
    return $rjson;
});

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