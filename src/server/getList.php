<?php
	include_once('server.php');
	

	$keyCode = $_GET["keyCode"];
	$path = "rescource";
	if($keyCode == "list"){
	 	echo json_encode(loopDir($path));
	}else if($keyCode == "json"){
		echo json_encode(getJSON($path));
	}
?>