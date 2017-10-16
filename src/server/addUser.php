<?php
	header('Content-Type:text/plain;charset=utf-8');

	include_once('server.php');
	$key = $_POST['skey'];
	
	//namely zs1ghyy
	if($key != 'zs1ghyy'){
		exit(0);
	}else{


		//个人信息的内容：

		//
		$id = $_POST['name'];

		$data = array(


		);
		createJSON($id,$data);
		echo "成功!";
	}
	
	
	



?>