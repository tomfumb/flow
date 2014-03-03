<?php

require_once('../common.php');

if(isset($_POST['from']) && isset($_POST['message'])) {
	
	$from = $_POST['from'];
	$message = $_POST['message'];
	
	if(is_null($from) || empty($from) || !filter_var($from, FILTER_VALIDATE_EMAIL)) {
		header('HTTP/1.1 400 Invalid email address', true, 400);
		exit();
	}
	
	if(is_null($message) || empty($message)) {
		header('HTTP/1.1 400 Empty message', true, 400);
		exit();
	}
	
	$sent = mail(
		$ccijEmail,
		'Feedback: Opportunities for Justice',
		$message,
		'From: ' . $from,
		'-f ' . $from
	);
	
	if($sent) {
		header('HTTP/1.1 200', true, 200);
		exit();
	}
	else {
		header('HTTP/1.1 400 Email not sent', true, 400);
		exit();
	}
}
else {
	header('HTTP/1.1 404 File not found', true, 404);
	exit();
}

?>
