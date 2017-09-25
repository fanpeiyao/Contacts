<?php
		/*
		* create new json
		* 
		*/
		function createJSON($id,$data){
			$json_string = json_encode($data);
			file_put_contents($id.".json",$json_string);
			
		}
		
		function deleteJSON($id){
			
		}
		
		/**
		*  遍历 $dir  返回路径数组
		*/
	    function loopDir($dir){
			
			if(!is_dir($dir)) return false;
			
			$handle = opendir($dir);
			
			$result = array();
			if($handle){
				while(($fl = readdir($handle)) !== false){
					$fl=iconv("gb2312","utf-8",$fl); 
					if($fl!='.' && $fl != '..'){
						$temp = $dir.DIRECTORY_SEPARATOR.$fl;
						array_push($result,$temp);
					}
				}
			}
			return $result;
		}
		
		function getFileContent($filePath){
			$temp = file_get_contents($filePath);
			return $temp;
		}
		
		function getJSON($path){
			$ary = loopDir($path);
			$result = array();
			foreach ($ary as $value) {
				array_push($result,getFileContent($value));	
			}
			return json_encode($result);
		}
?>