<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="../css/waitingscreen.css">
	<link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/keyFrames.css">
    <link rel="stylesheet" href="css/responsive.css">
 </head>
<body>
<div class="fundo">
        <div class="bloco">
            <img src="../imagens/titulo_jogo.png">
<?php
	//Inclui o banco
	include "banco.php";

	if(isset($_POST['email'])){

		$EMAIL = $_POST['email'];
		echo "<div>";
		if(!filter_var($EMAIL, FILTER_VALIDATE_EMAIL)){
			echo 'EMAIL INVALIDO';
		}
		else{
			$novasenha = substr(md5(time()), 0, 6);
			$ns = md5(md5($novasenha));
			
	
			if(mail($EMAIL," Caro Usuário, pare de ser idiota, obrigado" . "\n","Sua senha nova: ".$novasenha)){
				$sql_code = "UPDATE Aluno SET Senha = '$ns' WHERE Email = '$EMAIL' ";
				$sql_query = $mysqli-> query($sql_code) or die($mysqli->error);

				if($sql_query){
					echo 'Senha alterada com sucesso!';
				}
			}
		}

	}
?>
</div>
</div>
 </body>
</html>