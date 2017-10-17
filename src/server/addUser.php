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

		/**


      "id":45,
        "name": "陈聪",
        "birthday": "10月24日",
        "mobile":"134-2966-5900",
        "email":"chencong@gyj.com",
        "telephone":"0571-85135829",
        "photo":"resource/images/chencong.jpg",
        "photoBg":"resource/images/chencong-detail.jpg",
        "weixin":"13429665900",
        "experience":[{"time":"2017.9-至今","company":"交易银行中心"},{"time":"2014.4-2017.8","company":"网金科研"}],
        "groupName":"产品经理团队",
        "post":"研发工程师",
        "interest":"兴趣广泛",
        "liveArea":"江干区",
        "nativePlace":"金华 JinHua",
        "maritalStatus":"已婚",
        "team":8
		*/

		$name = $_POST['name'];
		$birthday = $_POST['birthday'];
		$mobile = $_POST['mobile'];
		$email = $_POST['email'];
		$telephone = $_POST['telephone'];
		$photo = $_POST['photo'];
		$photoBg = $_POST['photoBg'];
		$weixin = $_POST['13429665900'];
		$experience = $_POST['experience'];
		$groupName = $_POST['groupName'];
		$post = $_POST['post'];
		$interest = $_POST['interest'];
		$liveArea = $_POST['liveArea'];
		$nativePlace = $_POST['nativePlace'];
		$maritalStatus = $_POST['maritalStatus'];





		$data = array(


		);
		createJSON($id,$data);
		echo "成功!";
	}
	
	
	



?>