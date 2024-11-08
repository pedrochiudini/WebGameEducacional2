<!DOCTYPE html>
<html lang="pt">
    <meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="../css/css_forms.css">
    <script>
    function loginsuccessfuly(){
        setTimeout("window.location='../html/login.html'", 2500);
    }
    function loginfailed(){
        setTimeout("window.location='../html/login.html'", 2500);
    }
	</script>
 </head>
 <body> 
    <?php

# alterar a variavel abaixo colocando o seu email

$destinatario = "polianastruecker@gmail.com";

$nome = $_POST['fnome'];
$email = $_POST['femail'];
$mensagem = $_POST['fmensagem'];
$assunto = $_POST['fassunto'];

 // monta o e-mail na variavel $body

$body = "===================================" . "\n";
$body = $body . "FALE CONOSCO" . "\n";
$body = $body . "===================================" . "\n\n";
$body = $body . "Nome: " . $nome . "\n";
$body = $body . "Email: " . $email . "\n";
$body = $body . "Mensagem: " . $mensagem . "\n\n";
$body = $body . "===================================" . "\n";

// envia o email
mail($destinatario, $assunto , $body, "From: $email\r\n");


?>
 </body>
</html>




