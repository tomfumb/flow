<?php

require_once('../common.php');
require_once('../lib/simple_html_dom.php');

if(isset($_POST['to']) && isset($_POST['message'])) {
	
	$to = $_POST['to'];
	$message = $_POST['message'];
	
	if(is_null($to) || empty($to) || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
		header('HTTP/1.1 400 Invalid email address', true, 400);
		exit();
	}
	
	if(is_null($message) || empty($message)) {
		header('HTTP/1.1 400 Empty message', true, 400);
		exit();
	}
	
	$dom = str_get_html($message);
	
	$links = $dom->find('a');
	$scripts = $dom->find('script');
	
	// security: 	help prevent someone from sending spam through this service
	// step 1:		remove any anchor or script tags from the output
	if(count($links) > 0 || count($scripts) > 0) {
		header('HTTP/1.1 400 Bad request', true, 400);
		exit();
	}
	
	/*
	// step 2:		remove any attributes that could include onclick, onmouseover etc.
	// currently disabled as recursing through element references not supported in CCIJ PHP version
	// removeAllAttributes($dom);
	*/
	
	$content = $dom->innertext . '<br /><br /><a href="' . $toolUrl . '">Opportunities for Justice</a>';
	
	echo $content;
	
	$sent = mail(
		$to,
		'Results: Opportunities for Justice',
		$content,
		'Content-type: text/html; charset=iso-8859-1',
		'-f ' . $ccijEmail
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

/*
function removeAllAttributes(&$parent) {
	
	foreach($parent->find('*') as &$element) {
		
		foreach($element->attr as &$attribute) {
			$attribute = null;
		}
		
		if(count($element->children()) > 0) {
			removeAllAttributes($element);
		}
	}
}
*/

?>
