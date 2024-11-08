<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Cadastro</title>
  <link rel="stylesheet" type="text/css" href="../css/waitingscreen.css">
	<link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/keyFrames.css">
  <link rel="stylesheet" href="../css/responsive.css">
</head>
<body>
<?php
  session_start();
?>
    <!--p align="center"><img id="imagem_logo" align="" src=""  alt=""></p-->
    <!--p id="p">Cadastre-se e Jogue!!!</p-->
    <form name="cadastro" 
    		  action="../php_pagina/altera.php" method="POST">
		<fieldset class="fieldset">
         <legend id="legend_cadastro">Dados pessoais</legend> 
           <ul>
            <li>
             <label class="label-form" for="nome"> Nome: </label>
             <input type="hidden" value="<?php echo $_SESSION['id_aluno']; ?>"/>
             <input type="text" class="input-contato"  maxlength="25" name="nome" placeholder="nome" autocomplete="on" autofocus tabindex="1" value="<?php echo $_SESSION['nome']; ?>" required/>
            </li>
            <li>
             <label class="label-form" for="email">E-mail: </label>
  		    	 <input type="email" class="input-contato" maxlength="45" name="femailCad" placeholder="email" autocomplete="on" tabindex="2" value="<?php echo $_SESSION['email']; ?>" required/>
            </li>
            <li>
  			     <label class="label-form" for="idade">Idade:</label>
  			     <input type="number" class="input-contato" maxlength="3" min="1" max="150" name="fidadeCad" placeholder="idade" autocomplete="on" tabindex="3" value="<?php echo $_SESSION['idade']; ?>" required/>
            </li>
           </ul>  
     <!--fieldset-->
		 <!--fieldset-->
         <!--legend>Dados Escolares</legend-->
           <ul>
            <li>
             <label class="label-form" for="escolaridade">Escolaridade:</label>
             <select name="escolaridade" class="input-contato" tabindex="4" required/>
               <option selected  value="<?php echo $_SESSION['escolaridade']; ?>"> </option>
               <option value="EF"> Ensino Fundamental </option>
               <option value="EM"> Ensino Médio </option>
               <option value="MT"> Médio Técnico </option>
               <option value="OT"> Outro </option>
             </select>
            </li>
         	  <li>
             <label class="label-form" for="escola">Escola:</label>
			       <input type="text" class="input-contato" maxlength="45" name="escola" placeholder="escola" autocomplete="on" tabindex="5" value="<?php echo $_SESSION['escola']; ?>" required/>
            </li>
            <li> 
			       <label class="label-form" for="estado">Estado:</label>
	           <select name="estado" maxlength="2" class="input-contato" tabindex="6" required> 
	             <option selected value="<?php echo $_SESSION['estado']; ?>"> </option>
	             <option value="AC" >Acre </option>
	             <option value="RS" >Rio Grande do Sul </option>
	             <option value="RN" >Rio Grande do Norte </option>
	             <option value="SC" >Santa Catarina</option>
	             <option value="PR" >Paran&aacute; </option>
	             <option value="SP" >S&atilde;o Paulo </option>
	             <option value="RJ" >Rio de Janeiro </option>
	             <option value="MG" >Minas Gerais </option>
	             <option value="ES" >Espirito Santo</option>
	             <option value="BA" >Bahia</option>
	             <option value="PE" >Pernambuco</option>
	             <option value="SE" >Sergipe</option>
	             <option value="AL" >Alagoas </option>
	             <option value="AP" >Amap&aacute;</option>
	             <option value="AM" >Amazonas</option>
	             <option value="CE" >Cear&aacute; </option>
	             <option value="DF" >Distrito Federal</option>
	             <option value="GO" >Goi&aacute;s</option>
	             <option value="MA" >Maranh&atilde;o </option>
	             <option value="MT" >Mato Grosso</option>
  	           <option value="MS" >Mato Grosso do Sul</option>
  	           <option value="PA" >Par&aacute; </option>
  	           <option value="PB" >Para&iacute;ba</option>
  	           <option value="PI" >Piau&iacute; </option>
  	           <option value="RO" >Rondonia</option>
  	           <option value="RR" >Roraima </option>
  	           <option value="TO" >Tocantins </option>
	           </select>
            </li>
            <li> 
	           <label class="label-form" for="cidade">Cidade:</label>
			  	   <input type="text" class="input-contato" maxlength="40" name="cidade"  placeholder="cidade" autocomplete="on" tabindex="7" value="<?php echo $_SESSION['cidade']; ?>" required/> 
            </li>
           </ul> 
      <!--/fieldset-->
		  <!--fieldset-->
          <!--legend>Senha</legend-->
         	 <ul>
            <li>
             <label class="label-form" for="senha">Senha:</label>
         	   <input type="password" class="input-contato" maxlength="8" name="senha" placeholder="no máximo 8 caracteres" autocomplete="on" tabindex="8" value="<?php echo $_SESSION['senha']; ?>" required/>
             <input id="input"  class="input-contato" type="reset"  name="reset" value="Limpar Formulário" tabindex="10"/>
            <li>
            </li>
             <label class="label-form" for="senha">Confirmar Senha:</label>
         	   <input type="password" class="input-contato" maxlength="8" name="senha1" placeholder="confirmar senha" autocomplete="on" tabindex="9" value="<?php echo $_SESSION['senha']; ?>" required/>
             <input id="inputa"  class="input-contato" type="submit" name="criar" value="Alterar Conta" tabindex="11"/>
            </li>   	   
           </ul> 
      </fieldset>
		</form>

</body>
</html>