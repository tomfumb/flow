<?php

require_once('../common.php');

if(isset($_POST['email']) && isset($_POST['news'])) {
	
	$email = $_POST['email'];
	$news = $_POST['news'];
	
	if(is_null($email) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
		header('HTTP/1.1 400 Invalid email address', true, 400);
		exit();
	}
	
	if(is_null($news) || empty($news)) {
		header('HTTP/1.1 400 Invalid news', true, 400);
		exit();
	}
	
	$ip = null;
	$city = null;
	$region = null;
	$country = null;
	$location = null;
	
	try {
		
		$ip = $_SERVER['REMOTE_ADDR'];
		
		$details = json_decode(file_get_contents("http://freegeoip.net/json/$ip"));
		
		$city = $details->city;
		$region = $details->region_name;
		$country = $details->country_name;
		$latitude = $details->latitude;
		$longitude = $details->longitude;
	}
	catch (Exception $e) {
		header('HTTP/1.1 400 Problem with ip info', true, 400);
		exit();
	}
	
	
	
	// ***
	// Store email address, news preference, and location information in user database
	// ***
	
	
	
}
else {
	header('HTTP/1.1 404 File not found', true, 404);
	exit();
}

?>
