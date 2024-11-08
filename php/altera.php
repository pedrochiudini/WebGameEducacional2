<!DOCTYPE html>
<html lang="pt">
    <meta charset="utf-8">
	<link rel="stylesheet" href="../css/waitingscreen.css">
	<link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/keyFrames.css">
    <link rel="stylesheet" href="../css/responsive.css">
	<script>
    function loginsuccessfuly(){
        //setTimeout("window.location='../jogo_ciencias_5/index.html'", 1500);
         setTimeout("window.location='login.php'", 1500);
    }
    function loginfailed(){
        setTimeout("window.location='edit.php'", 1500);
    }
	</script>
 </head>
 <body> 
<?php
		session_start();
		include "banco.php";

		echo "<div>";

		//$ID_ALUNO = $_SESSION['id_aluno'];
		$NOME = $_POST['nome'];
		$EMAIL = $_POST['email'];
		$IDADE = $_POST['idade'];
		$ESCOLARIDADE = $_POST['escolaridade'];
		$ESCOLA = $_POST['escola'];
		$ESTADO = $_POST['estado'];
		$CIDADE = $_POST['cidade'];
		$SENHA = $_POST['senha'];
		$SENHA1 = $_POST['senha1'];

		//echo $NOME; echo $ID_ALUNO; 

		if ($SENHA == $SENHA1) {
	    	$consulta = mysqli_query($conexao,"UPDATE Aluno SET  Nome = '$NOME', Email = '$EMAIL', Idade = '$IDADE', 
					  Escolaridade = '$ESCOLARIDADE', Escola = '$ESCOLA', Estado = '$ESTADO', Cidade = '$CIDADE',
					  Senha = '$SENHA' WHERE ID_Aluno = $_SESSION[id_aluno] ");
	    	// Commit transaction
			mysqli_commit($conexao);
			// Close connection
			//mysqli_close($conexao); 
	    	echo "<p id='p'>Cadastro alterado com sucesso!</p></br>";
	    	echo "<script>loginsuccessfuly()</script>";
	    }	
		else{
    		echo "<p id='p'>Senhas diferentes!!!</p>";
    		echo "<script>loginfailed()</script>";	
		}
    	echo "</div>";
?>

 </body>
</html>
