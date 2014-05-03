<?php

    require_once('manager.php');

    $manager = new Manager();
    $isAuthenticated = $manager->isAuthenticated();
    
    $message = null;
    $hasMessage = array_key_exists('message', $_REQUEST);
    if($hasMessage) {
	$message = $_REQUEST['message'];
	$hasMessage = !empty($message);
    };
?>
	
<!DOCTYPE html>
<html lang="en">
    <head>
	<title>Authentication</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style type="text/css">
	    @import url('../css/lib/bootstrap/css/bootstrap.min.css');
	    @import url('../css/lib/bootstrap/css/bootstrap-theme.min.css');
	</style>
	<script type="text/javascript" src="../js/lib/jquery-1.10.2.min.js"></script>
	<script type="text/javascript">
	    
	    $(function() {
		$('#submitType').val($('#login').is(':visible') ? 'login' : 'add');
	    });
	</script>
    </head>
    <body>
	<form method="POST" action="process.php">
	    <div class="container">
		<div class="row" style="margin-top: 20px;"></div>
		<div class="row" style="display: <?php echo ($hasMessage ? '' : 'none'); ?>;">
		    <div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
			<div class="alert alert-warning">
			    <?php echo $message; ?>
			</div>
		    </div>
		</div>
		<div class="row">
		    <div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
			<div class="input-group">
			    <span class="input-group-addon">User</span>
			    <input type="text" class="form-control" placeholder="Email Address" id="username" name="username" />
			</div>
		    </div>
		</div>
		<div class="row" style="margin-top: 10px;">
		    <div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
			<div class="input-group">
			    <span class="input-group-addon">Pass</span>
			    <input type="password" class="form-control" placeholder="Password" id="password" name="password"/>
			</div>
		    </div>
		</div>
		<div class="row" style="margin-top: 10px;">
		    <div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
		    <button type="submit" id="login" class="btn btn-success" title="Login" style="display: <?php echo ($isAuthenticated ? 'none' : ''); ?>;">Login</button>
		    <button type="submit" id="add" class="btn btn-default" title="Add user" style="display: <?php echo ($isAuthenticated ? '' : 'none'); ?>;">
			<span class="glyphicon glyphicon-plus"></span>
		    </button>
		    </div>
		</div>
	    </div>
	    <input type="hidden" id="submitType" name="submitType" value="" />
	</form>
    </body>
</html>