<!DOCTYPE html>
<html lang="pt">
<meta charset="utf-8">
<link rel="stylesheet" href="../css/waitingscreen.css">
<link rel="stylesheet" href="../css/style.css">
<link rel="stylesheet" href="../css/keyFrames.css">
<link rel="stylesheet" href="../css/responsive.css">
<script>
	//função para retornar o usuário para a index depois de fazer alguma operação de cadastro
	function returntoindex() {
		setTimeout("window.location='../index.html'", 1500);
	}
</script>
</head>

<body>
	<?php
	// session_start();
	include "banco.php";

	$NOME = $_POST['nome'];
	$EMAIL = $_POST['femailCad'];
	$IDADE = $_POST['fidadeCad'];
	$ESCOLARIDADE = $_POST['escolaridade'];
	$ESCOLA = $_POST['escola'];
	$ESTADO = $_POST['estado'];
	$CIDADE = $_POST['cidade'];
	$SENHA = $_POST['fsenhaLogin'];
	$SENHA1 = $_POST['fConfsenhaLogin'];

	echo "<div>";

	//mysqli_select_db($conexao, "game");

	//Aqui você verifica em seu banco de dados, se o login já foi cadastrado
	if ($EMAIL > "1") {
		$consulta = mysqli_query($conexao, "SELECT * FROM Aluno WHERE email='$EMAIL';");
		$quantidade = mysqli_num_rows($consulta);
		if ($quantidade > 0) {
			echo "<p id='p'>Email já cadastrado</p></br>";  //Sucesso
			echo "<script>returntoindex()</script>";
		} else if ($SENHA == $SENHA1) {
			$sqlgravar = "INSERT INTO Aluno(id_aluno, nome, email, idade, escolaridade, escola, estado, cidade, senha) 
	        				  VALUES (id_aluno, '$NOME','$EMAIL', '$IDADE', '$ESCOLARIDADE', '$ESCOLA', '$ESTADO', '$CIDADE', '$SENHA')";
			$resultado = mysqli_query($conexao, $sqlgravar);
			echo "<p id='p'>Usuário inserido com sucesso!</p></br>";
			echo "<p id='p'>Efetue Login para começar a jogar.</p></br>";
			echo "<script>returntoindex()</script>";
		} else {
			echo "<p id='p'>Senhas diferentes!!!</p></br>";
			echo "<script>returntoindex()</script>";
		}
	}

	/*
		echo "</br>";
		echo "Hoje é dia " . date('d/m/Y');
		echo " agora são " . date('H:i:s')."</br>";


		echo " Consulta:</br>";
			$sqlconsulta = "SELECT * FROM Table_Aluno order by 1";
	  		$consulta2 = mysqli_query($conexao, $sqlconsulta) or die(mysqli_error($conexao));
	    
	    while($linha = mysqli_fetch_array($consulta2))
	  	{
	   	 	echo $linha['id_aluno'] . " - " . $linha['nome'] . " - " .$linha['email'] . " - " 
	   	 	.$linha['idade'] . " - " . $linha['senha'] ."</br>"; 
	  	}
		*/
	echo "</div>";

	mysqli_close($conexao);
	?>
</body>

</html>