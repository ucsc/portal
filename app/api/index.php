<?php
ini_set('display_errors', 1);
require_once('vendor/twitter-api-php/TwitterAPIExchange.php');
/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "2835904524-p8sVyTgumZ6WSfX3njm2l6hdqrFCTIYc6V9l9Yb",
    'oauth_access_token_secret' => "5ZJ9Tw0n3ixKBnVdhHzEX9nPXvTxyCtPYsleFqDvYzkhS",
    'consumer_key' => "nYQdNfZRUvLHhpT4hAZSg2sfT",
    'consumer_secret' => "OabqTmsQNrKxgEJ4LFiDRwd82vZfCxSqtE7Pof2Wg5qEj0eN43"
);

require 'Slim/Slim.php';
$app = new Slim();
$app->get('/weather', 'getWeather');
$app->get('/weather/touch', 'touchWeather');
$app->get('/emergency/check', 'checkEmergency');
$app->get('/emergency', 'getEmergency');
$app->run();

function touchWeather() {
	//$weatherFeed = "http://api.wunderground.com/api/be527d7317e1fe1c/hourly/q/CA/Santa_Cruz.json";
	//$weatherFeed = "http://api.wunderground.com/api/be527d7317e1fe1c/conditions/q/CA/Santa_Cruz.json";
	//$tideFeed = "http://api.wunderground.com/api/be527d7317e1fe1c/tide/q/CA/Santa_Cruz.json";
	$weatherFeed = "http://api.wunderground.com/api/be527d7317e1fe1c/conditions/tide/alerts/astronomy/q/CA/Santa_Cruz.json";
	$response = array();

	$weatherReport = json_decode(file_get_contents($weatherFeed), true);
	$currentTemperature = round($weatherReport["current_observation"]["temp_f"]);
	$currentCondition = $weatherReport["current_observation"]["weather"];
	$currentIcon = $weatherReport["current_observation"]["icon"];
	$currentIconUrl = $weatherReport["current_observation"]["icon_url"];

	//$tideReport = json_decode(file_get_contents($tideFeed), true);
	foreach($weatherReport["tide"]["tideSummary"] as $report) {
		if($report["data"]["type"] == "Low Tide") {
			$prettyTimeStr = $report["date"]["pretty"];
			$prettyTime = explode(' ',trim($prettyTimeStr));
			$nextLowTideTime = $prettyTime[0];
			$tideTOD = $prettyTime[1];
			$tideHeight = $report["data"]["height"];
			if($report["data"]["height"]{0} == '-') {
				$negTide = $report["data"]["height"];
			}
			break;
		}
	}

	$currentTime = floatval($weatherReport["moon_phase"]["current_time"]["hour"].'.'.$weatherReport["moon_phase"]["current_time"]["minute"]);
	$sunrise = floatval($weatherReport["moon_phase"]["sunrise"]["hour"].'.'.$weatherReport["moon_phase"]["sunrise"]["minute"]);
	$sunset = floatval($weatherReport["moon_phase"]["sunset"]["hour"].'.'.$weatherReport["moon_phase"]["sunset"]["minute"]);
	if($currentTime < $sunrise || $currentTime > $sunset) {
		$isNight = true;
		$isDay = false;
	} else {
		$isNight = false;
		$isDay = true;
	}
	
	$clear = array('clear', 'sunny', 'unknown', 'hazy', 'mostlysunny');
	$cloudy = array('cloudy', 'mostlycloudy', 'fog');
	$partly = array('partlysunny', 'partlycloudy');
	$snow = array('flurries', 'snow');
	$rain = array('sleet', 'rain');
	$storms = array('tstorms');
	if(in_array($currentIcon, $cloudy)){
		$currentIcon = 'icon-cloudy';
	} elseif(in_array($currentIcon, $partly)){
		if($isNight){
			$currentIcon = 'icon-cloudy-moon';
		} else{
			$currentIcon = 'icon-cloudy-sun';
		}
	} elseif(in_array($currentIcon, $snow)){
		$currentIcon = 'icon-snow';
	} elseif(in_array($currentIcon, $rain)){
		$currentIcon = 'icon-rain';
	} elseif(in_array($currentIcon, $storms)){
		$currentIcon = 'icon-cloud-flash';
	} else{
		if($isNight){
			$currentIcon = 'icon-moon';
		} else{
			$currentIcon = 'icon-sun';
		}
	}

	$response[] = array(
		'temp'=>$currentTemperature,
		'condition'=>$currentCondition,
		'icon'=>$currentIcon,
		'icon_url'=>$currentIconUrl,
		'low_tide'=>$nextLowTideTime,
		'low_tide_ampm'=>$tideTOD,
		'low_tide_height'=>$tideHeight,
		'low_tide_neg'=>isset($negTide),
		'is_day'=>$isDay,
		'is_night'=>$isNight
	);

	echo json_encode($response);

	$fp = fopen('static/weather.json', 'w');
	fwrite($fp, json_encode($response));
	fclose($fp);
}

function getWeather() {
	$json = json_decode(file_get_contents('static/weather.json'));
	echo json_encode($json);
}

function checkEmergency() {
    global $settings;
    $url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
    $getfield = '?screen_name=ucsc_cruzalert';
    $requestMethod = 'GET';

    $twitter = new TwitterAPIExchange($settings);
    $response = $twitter->setGetfield($getfield)
        ->buildOauth($url, $requestMethod)
        ->performRequest();

    //var_dump(json_decode($response));
    $json = json_decode($response);
    $arrayobj = array();

    foreach($json as $tweet) {
        $date = $tweet->created_at;
        //$date = "Tue Sept 30 20:14:55 +0000 2014";
        if (strtotime("$date +1 day") >= time()) {
            array_push($arrayobj, $tweet);
        }
    }

    echo json_encode($arrayobj);
}

function getEmergency() {
    global $settings;
    $url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
    $getfield = '?screen_name=ucsc_cruzalert';
    $requestMethod = 'GET';

    $twitter = new TwitterAPIExchange($settings);
    $response = $twitter->setGetfield($getfield)
        ->buildOauth($url, $requestMethod)
        ->performRequest();

    $json = json_decode($response);
    echo json_encode($json);
}

?>