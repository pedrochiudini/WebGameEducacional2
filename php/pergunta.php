	<?php
	
		header('Content-Type: application/json; charset=utf-8');

		//Conexão com o banco de dados
		//session_start();
		include 'banco.php';

		//mysqli_select_db($conexao, "game");//conexão e nome do banco

		$idPergunta = $_GET['pergunta'];


		$sql_pergunta = "SELECT p.id_pergunta, p.questao
			FROM Pergunta p
			WHERE p.id_pergunta = $idPergunta";

        $exibe = mysqli_query($conexao, $sql_pergunta) or die(mysqli_error($conexao));
 

       	echo json_encode(mysqli_fetch_array($exibe));
		
	?>


