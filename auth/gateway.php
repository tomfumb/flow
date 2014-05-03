<?php

    require_once('manager.php');
    
    $manager = new Manager();
    if(!$manager->isAuthenticated()) {
	header('Location: auth/', true, 302);
	exit();
    }
?>