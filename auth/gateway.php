<?php

    // Basic authentication approach implemented during testing and refinement, final product will not require authentication

    require_once('manager.php');
    
    $manager = new Manager();
    if(!$manager->isAuthenticated()) {
	header('Location: auth/', true, 302);
	exit();
    }
?>