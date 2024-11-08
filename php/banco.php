<?php

		$db_host = 'localhost';
	  	$db_user = 'root';
	  	$db_senha = ''; 
	  	$db_name = 'game';
    
	  	$conexao = mysqli_connect($db_host,$db_user,$db_senha,$db_name);
		if(!$conexao){
			echo "Problemas para conectar no banco.!";
			die();
		}
		mysqli_set_charset($conexao,"utf8");
		//echo "Connected successfully";
		//mysqli_close($conexao, "game");
		    
?>
