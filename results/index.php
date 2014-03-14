<?php

require_once('../common.php');

if(isset($_POST['to']) && isset($_POST['message']) && isset($_POST['cc'])) {
	
	$to = $_POST['to'];
	$message = $_POST['message'];
	$cc = $_POST['cc'];
	
	echo $cc;
	exit;
	
	if(is_null($to) || empty($to) || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
		header('HTTP/1.1 400 Invalid email address', true, 400);
		exit();
	}
	
	if(is_null($message) || empty($message)) {
		header('HTTP/1.1 400 Empty message', true, 400);
		exit();
	}
	
	$message = $_POST['message'];
	$dom = new DOMDocument;
	$dom->loadHTML($message);
	
	$badCount = 0;
	foreach($dom->getElementsByTagName('a') as $a) {
		$badCount++;
	}
	
	foreach($dom->getElementsByTagName('script') as $script) {
		$badCount++;
	}
	
	if($badCount > 0) {
		header('HTTP/1.1 400 Bad request', true, 400);
		exit();
	}
	
	$xpath = new DOMXPath($dom);
	$attrs = $xpath->query('//@*');
	foreach ($attrs as $attr) {
		$attr->parentNode->removeAttribute($attr->nodeName);
	}
	
	$content = $dom->saveHTML() . '<br /><br /><a href="' . $toolUrl . '">Opportunities for Justice</a>';
	
	$sent = mail(
		$to,
		'Results: Opportunities for Justice',
		$content,
		'Content-type: text/html; charset=iso-8859-1',
		'-f ' . $ccijEmail
	);
	
	if($cc) {
		// also send to CCIJ but fire-and-forget - don't alter the response if this email fails
		mail(
			$ccijEmail,
			'CC Results: Opportunities for Justice (' . $to . ')',
			$content,
			'Content-type: text/html; charset=iso-8859-1',
			'-f ' . $to
		);
	}
	
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
