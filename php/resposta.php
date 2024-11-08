	<?php

		//Os scripts PHP não estavam retornando as informações. Quando for fazer algo com ajax você pode testar diretamente no navegador para ver o resultado de saida, assim sabe se seu PHP está correto, por exemplo, pode chamar no navegador http://localhost/pagina_web_game_local/php_pagina/pergunta.php?pergunta=1 e ver se está retornando os dados corretos. Outro detalhe, você pode usar o Chrome dev tool debugar seu JS e verificar como está se comportando o código se está retornando e etc. 
		//Para o retorno do json do PHP ser considerado como json precisa indicar que é um json e também não passar nada de html. Da uma olhada no arquivo pergunta.php agora está retornando corretamente para o Ajax, único detalhe é que a div pergunta está com display none. Já o arquivo resposta.php não está buscando corretamente baseado no que está tentando mostrar no js. 

		header('Content-Type: application/json; charset=utf-8');

		//Conexão com o banco de dados
		//session_start();
		include 'banco.php';

		mysqli_select_db($conexao, "game");//conexão e nome do banco

		$idPergunta = $_GET['pergunta'];

		$sql_pergunta = "SELECT r.resposta, pr.certo_errado
			FROM Resposta r, Pergunta_Resposta pr
			WHERE pr.Resposta_ID_Resposta = r.ID_Resposta
			AND pr.Pergunta_ID_Pergunta = $idPergunta";

        $exibe = mysqli_query($conexao, $sql_pergunta) or die(mysqli_error($conexao));
		

 		while ($linha = mysqli_fetch_array($exibe)) { 

		   	extract($linha); 
		   	//$Array[] = Array(
		        			//"Resposta"  => "$resposta",
		        			//"Certo Errado" => "$certo_errado",
		    //			); 
		    $Array[] = $linha;

		} 

		echo json_encode($Array);

        //while($linha = mysqli_fetch_array($exibe))
        //{ 
            //$exibe[] = $exibe;
			//echo json_encode(mysqli_fetch_array($exibe));
            //$linha['resposta'].$linha['certo_errado'];
       // }
 
       	//echo json_encode(mysqli_fetch_array($exibe));

	?>

