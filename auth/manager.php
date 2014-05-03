<?php

    class Manager {
	
	var $usersFile = './users.json';
	var $authProperty = 'auth';
	
	function Manager() {
	    session_start();
	}
	
	function isAuthenticated() {
	    return array_key_exists($this->authProperty, $_SESSION);
	}
	
	function authenticate($username, $password) {
	    
	    $content = $this->readUsersFile();
	    if(!is_null($content)) {
		
		foreach($content->users as $user) {

		    if(strtolower($username) === strtolower($user->username) && $user->password === $this->hash($password, $user->salt)) {
			$_SESSION[$this->authProperty] = true;
			return true;
		    }
		}
	    }
	    
	    return false;
	}
	
	function userExists($username) {
	    
	    $content = $this->readUsersFile();
	    if(!is_null($content)) {
		
		foreach($content->users as $user) {
		    if(strtolower($username) === strtolower($user->username)) {
			return true;
		    }
		}
	    
		return false;
	    }
	    
	    // safety net
	    return true;
	}
	
	function createUser($username, $password) {
	    
	    if(!$this->isAuthenticated()) {
		return false;
	    }
	    
	    if($this->userExists($username)) {
		return false;
	    }
	    
	    $content = $this->readUsersFile();
	    if(!is_null($content)) {
		
		$newUser = new stdClass();
		$newUser->username = str_replace('"', '\\"', $username);
		$newUser->salt = $this->generateSalt();
		$newUser->password = $this->hash($password, $newUser->salt);
		
		array_push($content->users, $newUser);
		
		if($this->writeUsersFile($content)) {
		    return true;
		}
		else {
		    return false;
		}
	    }
	    
	    return false;
	}
	
	function readUsersFile() {
	    $json = file_get_contents($this->usersFile);
	    return json_decode($json);
	}
	
	function writeUsersFile($content) {
	    $json = json_encode($content);
	    return (file_put_contents($this->usersFile, $json) !== false);
	}
	
	function hash($input, $salt) {
	    return hash("sha256", $input . $salt);   
	}
	
	function generateSalt() {
	    $initial = md5(uniqid(rand(), true));
	    return substr($initial, 0, 10);
	}
    }
?>
