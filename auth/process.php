<?php

    // Basic authentication approach implemented during testing and refinement, final product will not require authentication
    
    require_once('manager.php');

    $usernameKey = 'username';
    $passwordKey = 'password';
    $submitTypeKey = 'submitType';
    
    if(!(array_key_exists($usernameKey, $_REQUEST) && array_key_exists($passwordKey, $_REQUEST) && array_key_exists($submitTypeKey, $_REQUEST))) {
	complete(false, 'Insufficient information provided');
    }
    
    $username = $_REQUEST[$usernameKey];
    $password = $_REQUEST[$passwordKey];
    $submitType = $_REQUEST[$submitTypeKey];
    
    if(empty($username) || empty($password) || empty($submitType)) {
	complete(false, 'Insufficient information provided');
    }
    
    $manager = new Manager();
    
    switch($submitType) {
	
	case 'login':
	    
	    if($manager->authenticate($username, $password)) {
		complete(true);
	    }
	    else {
		complete(false, 'Incorrect username or password');
	    }
	    
	    break;
	    
	case 'add':
	    
	    if($manager->userExists($username)) {
		complete(false, 'Username already exists');
	    }
	    
	    if(!filter_var($username, FILTER_VALIDATE_EMAIL)) {
		complete(false, 'Please provide a valid email address for username');
	    }
	    
	    if($manager->createUser($username, $password)) {
		complete(false, 'User ' . $username . ' created');
	    }
	    else {
		complete(false, 'Sorry, there was a problem creating the user');
	    }
	    
	    break;
    }
    
    function complete($toApp, $message = null) {
	
	$location = null;
	if($toApp) {
	    $location = '../';
	}
	else {
	    $location = './';
	}
	
	if(!is_null($message)) {
	    $location .= '?message=' . urlencode($message);
	}
	
	header('Location: ' . $location, true, 302);
	exit();
    }
    
    header('Location: ./?message=' . urlencode('Sorry, something has gone wrong'), true, 302);
    exit();
?>