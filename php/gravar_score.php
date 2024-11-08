<?php
		session_start();
		include 'banco.php';

		//mysqli_select_db($conexao, "game");
		//echo $_SESSION['id_aluno'];
		$ID_ALUNO = $_SESSION['id_aluno'];
		$SCORE = $_GET['placar'];

		$sqlgrava_score = "INSERT INTO Score (id_score, score, data_hora, aluno_id_aluno)
			VALUES (id_score, '$SCORE', sysdate(), '$ID_ALUNO')";	
	    
	    $consulta= mysqli_query($conexao, $sqlgrava_score) or die(mysqli_error($conexao));   
	    
	    // Commit transaction
		//mysqli_commit($sqlgrava_score);//Não está atualizando o score
		mysqli_commit($conexao, "game");
		//mysqli_commit($sqlgrava_score);
		//mysqli_close($consulta);
		
		//Close connection
		mysqli_close($conexao, "game");
		//mysqli_close($sqlgrava_score);
		//mysqli_close($consulta);

		


		; 
	  	//echo "<p id='p'>Score inserido com sucesso!</p></br>";
//Exemplo
/* Insert some values */
//mysqli_query($link, "INSERT INTO Language VALUES ('DEU', 'Bavarian', 'F', 11.2)");
//mysqli_query($link, "INSERT INTO Language VALUES ('DEU', 'Swabian', 'F', 9.4)");

/* commit transaction */
//mysqli_commit($link);

/* close connection */
//mysqli_close($link);

?>


