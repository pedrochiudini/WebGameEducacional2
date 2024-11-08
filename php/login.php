<?php
session_start();
?>

<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="../css/waitingscreen.css">
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <link rel="stylesheet" type="text/css" href="../css/keyFrames.css">
    <link rel="stylesheet" type="text/css"href="../css/responsive.css">
    <script>
        function loginsuccessfuly() {
            //setTimeout("window.location='../jogo_ciencias_5/index.html','_parent'", 1500);
            setTimeout("window.open('../jogo_ciencias_5/index.html','_parent')", 1500);
        }

        function loginfailed() {
            setTimeout("window.location='../index.html'", 1500);
        }
    </script>
</head>

<body>
    <?php
    // Remova qualquer espaço em branco ou tags HTML antes do session_start()
    include "banco.php";

    $EMAIL = $_POST['femailLogin'];
    $SENHA = $_POST['fsenhaLogin'];

    if (!empty($EMAIL) && !empty($SENHA)) {
        echo "<div>";
        /*$stmt (Statement):
    Esta variável armazena a declaração preparada. 
    Uma declaração preparada é uma instrução SQL que é preparada, 
    compilada e armazenada no servidor de banco de dados antes da execução. 
    Os placeholders (?) são usados para representar valores que serão 
    fornecidos posteriormente. 
    Isso ajuda a evitar injeção de SQL, uma vez que os valores 
    são tratados separadamente da instrução SQL.
    */
        //$sql = mysqli_query($conexao, "SELECT * FROM aluno WHERE email = '$EMAIL' and senha = '$SENHA'");
        $stmt = mysqli_prepare($conexao, "SELECT * FROM Aluno WHERE email = ? and senha = ?");
        /*mysqli_stmt_bind_param:
    Esta função vincula os parâmetros à declaração preparada. 
    No contexto do seu código, ss indica que estamos vinculando 
    dois parâmetros como strings (s). Os valores reais ($EMAIL e $SENHA) 
    são então fornecidos para substituir os placeholders na declaração 
    preparada. Isso garante que os valores sejam tratados corretamente 
    e evita problemas de SQL injection.
    */
        if (!$stmt) {
            die("Erro na preparação da declaração: " . mysqli_error($conexao));
        }
        mysqli_stmt_bind_param($stmt, "ss", $EMAIL, $SENHA);
        /*
    mysqli_stmt_get_result:
    Esta função obtém o resultado da execução da declaração preparada. 
    No contexto de uma consulta SELECT, ela retorna um objeto 
    mysqli_result que pode ser usado para obter os resultados da consulta.
    */
        if (!mysqli_stmt_execute($stmt)) {
            die("Erro na execução da declaração: " . mysqli_error($conexao));
        }

        $result = mysqli_stmt_get_result($stmt);

        if (!$result) {
            die("Erro ao obter resultado: " . mysqli_error($conexao));
        }

        $row = mysqli_num_rows($result);

        if ($row === null) {
            die("Erro ao obter o número de linhas: " . mysqli_error($conexao));
        }

        $linha_dados = mysqli_fetch_array($result);
        if ($row > 0) {
            $_SESSION['email'] = $_POST['femailLogin'];
            $_SESSION['senha'] = $_POST['fsenhaLogin'];
            $_SESSION['nome'] = $linha_dados['Nome'];
            $_SESSION['id_aluno'] = $linha_dados['ID_Aluno'];
            echo "<p id='p'>Logado com Sucesso. Redirecionando...</p>";
            echo "<script>loginsuccessfuly()</script>";
            exit(); // Adicione esta linha para interromper a execução
        } else {
            echo "<p id='p'>Nome de usuário ou senha inválidos.</p>";
            echo "<script>loginfailed()</script>";
            exit(); // Adicione esta linha para interromper a execução
        }
    }
    echo "</br>";
    echo "<h1> Hoje é dia " . date('d/m/Y') . " agora são " . date('H:i:s') . "<h1>";
    echo "</div>";
    ?>

</body>

</html>