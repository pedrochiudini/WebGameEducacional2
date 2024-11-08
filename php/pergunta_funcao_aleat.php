<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="utf-8">
	<link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/keyFrames.css">
    <link rel="stylesheet" href="css/responsive.css">
 </head>
 <body> 
	<?php
		//Conexão com o banco de dados
		//session_start();
		include 'banco.php';

		$sql_pergunta = "SELECT p.id_pergunta, p.questao, r.id_resposta, r.resposta, pr.certo_errado, p.peso 
			FROM pergunta p, resposta r, pergunta_resposta pr 
			WHERE p.id_pergunta = pr.pergunta_id_pergunta
			and r.id_resposta = pr.resposta_id_resposta";
			
		$exibe = mysqli_query($conexao, $sql_pergunta) or die(mysqli_error($conexao));

		while ($linha = mysqli_fetch_array($exibe)) {
            echo  "<p>" . $linha['id_pergunta'] . " -- " . $linha['questao'] . " -- " . $linha['resposta'] . " -- " . $linha['certo_errado']. "</p>";    
        }

		$count = "SELECT distinct(id_pergunta)
			FROM pergunta p, resposta r, pergunta_resposta pr 
			WHERE p.id_pergunta = pr.pergunta_id_pergunta
			and r.id_resposta = pr.resposta_id_resposta";
			
		$numero = mysqli_query($conexao, $count) or die(mysqli_error($conexao));
		$qtd = mysqli_num_rows($numero);
        echo  "<p>Quantidade de perguntas: " . $qtd . "</p>";    

		$minimo = "SELECT min(p.id_pergunta) 
			FROM pergunta p, resposta r, pergunta_resposta pr 
			WHERE p.id_pergunta = pr.pergunta_id_pergunta
			and r.id_resposta = pr.resposta_id_resposta";
			
		$numero1 = mysqli_query($conexao, $minimo) or die(mysqli_error($conexao));
		$min = mysqli_num_rows($numero1);
        echo  "<p>Valor mínimo: " . $min . "</p>"; 
	   
		$max = $qtd; 
		/** * Função para gerar números aleatórios
		* @param int $qnt quantidade de números que deseja gerar
		* @param int $min número mínimo que deseja gerar
		* @param int $max número máximo que deseja gerar
		* @param bool $repeat false se os números gerados podem repetir
		* @param bool $sort true se os números gerados devem ser ordenados
		* @param integer $sort_order critério de ordenação, sendo 0 para ordenação ascendente e 1 para ordenação descendente
		* @return array|string números gerados ou mensagem de erro caso ocorra */

		function getRandomNumbers($qtd, $min, $max, $repeat = false, $sort = true, $sort_order = 0) {
			if ((($max - $min) + 1) >= $qtd) {
				$numbers = array();
				while (count($numbers) < $qtd) {
					$number = mt_rand($min, $max);
					if ($repeat) {
						$numbers[] = $number;
					} elseif (!in_array($number, $numbers)) {
						$numbers[] = $number;
					}
				}
				if ($sort) {
					switch ($sort_order) {
						case 0:
							sort($numbers);
							break;
						case 1:
							rsort($numbers);
							break;
					}
				}
				return $numbers;
			} else {
				return 'A faixa de valores entre $min e $max deve ser igual ou superior à ' .
				'quantidade de números requisitados'; 
			}
		}

		// Obtém números aleatórios e exibe
		$randomNumbers = getRandomNumbers($qtd, $min, $max, false, false);
		echo "<p>Números aleatórios: " . implode(", ", $randomNumbers) . "</p>";

		echo "<p id='p'> Hoje é dia " . date('d/m/Y') . " agora são " . date('H:i:s')."</p>";
	?>
 </body>
</html>
