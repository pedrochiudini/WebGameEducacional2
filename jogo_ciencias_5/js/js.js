$(document).ready(function () {
    $("#fundoGame").hide();
    $("#info").hide();
    $("#aluno").hide();
    $("#placar").hide();
    $("#placar1").hide();
    $("#energia").hide();
    $("#pergunta").hide();
    $("#resposta").hide();
    $("#mensagemFinal").hide();
    $("#mensagemScore").hide();
    // $("div[data-alternativa]").hide();

    inicio = false;
    ganhou = true;

});

//Principais variáveis do jogo
var jogo = {};
var velocidade = 1;
var atirarJa = true;
var fimdejogo = false;
var pergunta = 1;
var acertos = 0;
var erros = 0;
var energiaAtual = 3;
var contadorPergunta = 1;
var contador = 0;

var TECLA = {
    Z: 90,
    C: 67,
    X: 88,
    Esquerda: 37,
    Acima: 38,
    Direita: 39
}

$(document).ready(function () {
    $.ajax({
        //pegando a url apartir do href do link
        url: "../php/logado.php",
        type: 'GET',
        success: function (data) {
            $("#aluno").html("<h2>" + data + "</h2>");
        }
    });
});


var sorteadas = [];

function aleatorio(inferior, superior) {
    numPossibilidades = superior - inferior
    aleat = Math.random() * numPossibilidades
    aleat = Math.floor(aleat)
    return parseInt(inferior) + aleat
}

function exibePergunta(perg) {  // Início da função exibePergunta()

    if (!perg) {
        pergunta = aleatorio(1, 26);
        sorteadas.push(pergunta)
    }
    else {
        pergunta = perg;
    }

    $.ajax({
        url: "../php/pergunta.php?pergunta=" + pergunta,
        type: 'GET',
        success: function (data) {
            if (contadorPergunta == 1) {
                $("#fundoGame").append("<div id='pergunta'  class='pergunta'><span class='numConPergunta'></span>" + ') ' + data.questao + "</div>");
            }
            else {
                $("#pergunta").html("<div id='pergunta'  class='pergunta'><span class='numConPergunta'></span>" + ') ' + data.questao + "</div>");
            }
            //sorteadas.push(pergunta)
            $('.numConPergunta').html(contadorPergunta);
            //alert("Conta Pergunta  "+ contadorPergunta);

            $.ajax({
                url: "../php/resposta.php?pergunta=" + pergunta,
                type: 'GET',
                success: function (respostas) {

                    console.log(respostas);

                    //alert("Nº da Pergunta: " + pergunta); 
                    var contador = 1;
                    for (const resposta of respostas) {
                        if (resposta.certo_errado == 'C') {
                            var funcao = 'onclick="certa()"';
                        }
                        else {
                            var funcao = 'onclick="errada()"';
                        }
                        if (contadorPergunta > 1) {
                            $('#resposta' + contador).remove();
                        }
                        switch (contador) {
                            case 1:
                                $("#fundoGame").append("<div id='resposta" + contador + "' class='resposta" + contador + "' data-alternativa='1'" + funcao + ">" + 'a) ' + resposta.resposta + "</div>");
                                break;
                            case 2:
                                $("#fundoGame").append("<div id='resposta" + contador + "' class='resposta" + contador + "' data-alternativa='2'" + funcao + ">" + 'b) ' + resposta.resposta + "</div>");
                                break;
                            case 3:
                                $("#fundoGame").append("<div id='resposta" + contador + "' class='resposta" + contador + "' data-alternativa='3'" + funcao + ">" + 'c) ' + resposta.resposta + "</div>");
                                break;
                            default:
                                $("#fundoGame").append("<div id='resposta" + contador + "' class='resposta" + contador + "' data-alternativa='4'" + funcao + ">" + 'd) ' + resposta.resposta + "</div>");
                        }
                        contador++;
                    }
                }
            });
        }
    });
}; // Fim da função exibePergunta()

function start() { // Início da função start()

    inicio = true;
    $("#fundoGame").show();
    $("#mensagemInicial").hide();
    $("#info").show();
    $("#aluno").show();
    $("#placar").show();
    $("#placar1").show();
    $("#energia").show();
    $("#fundoGame").append("<div id='cientista' class='anima1'></div>");
    fundoGame

    exibePergunta();

    //sorteadas.push(pergunta)
    //$("#pergunta"+pergunta).show();  
    //$("#pergunta").show();

    $("#fundoGame").append("<div id='alternativa1' data-alternativa='1'></div>");
    $("#fundoGame").append("<div id='alternativa2' data-alternativa='2'></div>");
    $("#fundoGame").append("<div id='alternativa3' data-alternativa='3'></div>");
    $("#fundoGame").append("<div id='alternativa4' data-alternativa='4'></div>");


    //Música em loop
    musica.addEventListener("ended", function () { musica.currentTime = 0; musica.play(); }, false);
    musica.play();

    jogo.pressionou = [];

    //Verifica se o usuário pressionou alguma tecla
    jogo.pressionou = [];
    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true;
    });

    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false;
    });

    //Chama Loop principal

    $(function () {

        jogo.timer = setInterval(loop, 100);

    });

    //Game Loop
    function loop() {

        if (inicio == true) {

            movecientista();
            movealternativa1();
            movealternativa2();
            movealternativa3();
            movealternativa4();
            colisao();
            energia();
            troca_alternativa();
            //verificaGameOver();

        }
    } // Fim da função loop()


    function movecientista() {

        if (jogo.pressionou[TECLA.Z]) {
            var esquerda = parseInt($("#cientista").css("left"));
            $("#cientista").css("left", esquerda - 10);
        }
        if (esquerda <= 320) {
            $("#cientista").css("left", esquerda + 10);
        }
        if (jogo.pressionou[TECLA.C]) {
            var esquerda = parseInt($("#cientista").css("left"));
            $("#cientista").css("left", esquerda + 10);

            if (esquerda >= 620) {
                $("#cientista").css("left", esquerda - 10);
            }
        }
        if (jogo.pressionou[TECLA.X]) {

            //Chama função Disparo
            raio();
        }

        if (jogo.pressionou[TECLA.Esquerda]) {
            var esquerda = parseInt($("#cientista").css("left"));
            $("#cientista").css("left", esquerda - 10);

            if (esquerda <= 270) {
                $("#cientista").css("left", esquerda + 10);
            }
        }

        if (jogo.pressionou[TECLA.Direita]) {
            var esquerda = parseInt($("#cientista").css("left"));
            $("#cientista").css("left", esquerda + 10);

            if (esquerda >= 650) {
                $("#cientista").css("left", esquerda - 10);
            }
        }

        if (jogo.pressionou[TECLA.Acima]) {

            //Chama função Disparo
            raio();
        }

    } // fim da função movecientista()

    function movealternativa1() {

        posicaoY = parseInt($("#alternativa1").css("top"));
        $("#alternativa1").css("top", posicaoY + velocidade);
        //$("#alternativa1").css("left",posicaoX);

        if (posicaoY >= 550) {
            //posicaoX = parseInt(Math.random() * 360);
            //$("#alternativa1").css("top",10);
            posicaoY = parseInt(Math.random() * 70);
            $("#alternativa1").css("top", posicaoY);
        }

    } //Fim da função movealternativa1()


    function movealternativa2() {

        posicaoY = parseInt($("#alternativa2").css("top"));
        $("#alternativa2").css("top", posicaoY + velocidade);
        //$("#alternativa2").css("left",posicaoX);

        if (posicaoY >= 550) {
            posicaoY = parseInt(Math.random() * 70);
            $("#alternativa2").css("top", posicaoY);
        }

    } //Fim da função movealternativa2()

    function movealternativa3() {

        posicaoY = parseInt($("#alternativa3").css("top"));
        $("#alternativa3").css("top", posicaoY + velocidade);
        //$("#alternativa3").css("left",posicaoX);

        if (posicaoY >= 550) {
            posicaoY = parseInt(Math.random() * 70);
            $("#alternativa3").css("top", posicaoY);
        }

    } //Fim da função movealternativa3()

    function movealternativa4() {

        posicaoY = parseInt($("#alternativa4").css("top"));
        $("#alternativa4").css("top", posicaoY + velocidade);
        //$("#alternativa4").css("left",posicaoX);

        if (posicaoY >= 550) {
            posicaoY = parseInt(Math.random() * 70);
            $("#alternativa4").css("top", posicaoY);
        }

    } //Fim da função movealternativa4()

    function raio() {

        if (atirarJa == true) {

            atirarJa = false;
            somRaio.play();

            esquerda = parseInt($("#cientista").css("left"))
            posicaoY = parseInt($("#cientista").css("top"))
            raioY = posicaoY - 50;
            esquerdaRaio = esquerda + 45;

            $("#fundoGame").append("<div id='raio'></div>");
            $("#raio").css("left", esquerdaRaio);
            $("#raio").css("top", raioY);

            var tempoRaio = window.setInterval(executaRaio, 30);
        } //Fecha podeAtirar

        function executaRaio() {

            posicaoY = parseInt($("#raio").css("top"));
            $("#raio").css("top", posicaoY - 10);

            if (posicaoY < 12) {

                window.clearInterval(tempoRaio);
                tempoRaio = null;
                $("#raio").remove();
                atirarJa = true;
            }

        } // Fecha executaRaio()
    } // Fecha Raio()

    function colisao() {
        var colisao1 = ($("#cientista").collision($("#alternativa1")));
        var colisao2 = ($("#cientista").collision($("#alternativa2")));
        var colisao3 = ($("#cientista").collision($("#alternativa3")));
        var colisao4 = ($("#cientista").collision($("#alternativa4")));
        var colisao5 = ($("#raio").collision($("#alternativa1")));
        var colisao6 = ($("#raio").collision($("#alternativa2")));
        var colisao7 = ($("#raio").collision($("#alternativa3")));
        var colisao8 = ($("#raio").collision($("#alternativa4")));

        // cientista com o alternativa1 
        if (colisao1.length > 0) {


            //var id = $("#alternativa1").data("alternativa");
            //console.log("#p".concat(window.pergunta, id));
            //$("#p".concat(pergunta, id)).trigger("click");
            errada();

            //energiaAtual--;
            alternativa1X = parseInt($("#alternativa1").css("left"));
            alternativa1Y = parseInt($("#alternativa1").css("top"));

            explosao1(alternativa1X, alternativa1Y);
            $("#alternativa1").remove();
            $("#alternativa2").remove();
            $("#alternativa3").remove();
            $("#alternativa4").remove();

            reposicionaAlternativa1();
            reposicionaAlternativa2();
            reposicionaAlternativa3();
            reposicionaAlternativa4();
        }

        // cientista com o alternativa2 
        if (colisao2.length > 0) {


            //var id = $("#alternativa2").data("alternativa");
            //$("#p".concat(pergunta, id)).trigger("click");
            errada();

            //energiaAtual--;
            alternativa2X = parseInt($("#alternativa2").css("left"));
            alternativa2Y = parseInt($("#alternativa2").css("top"));

            explosao1(alternativa2X, alternativa2Y);
            $("#alternativa1").remove();
            $("#alternativa2").remove();
            $("#alternativa3").remove();
            $("#alternativa4").remove();

            reposicionaAlternativa1();
            reposicionaAlternativa2();
            reposicionaAlternativa3();
            reposicionaAlternativa4();
        }

        // cientista com o alternativa3
        if (colisao3.length > 0) {


            //var id = $("#alternativa3").data("alternativa");
            //$("#p".concat(pergunta, id)).trigger("click");
            errada();

            //energiaAtual--;
            alternativa3X = parseInt($("#alternativa3").css("left"));
            alternativa3Y = parseInt($("#alternativa3").css("top"));

            explosao1(alternativa3X, alternativa3Y);
            $("#alternativa1").remove();
            $("#alternativa2").remove();
            $("#alternativa3").remove();
            $("#alternativa4").remove();

            reposicionaAlternativa1();
            reposicionaAlternativa2();
            reposicionaAlternativa3();
            reposicionaAlternativa4();
        }

        // cientista com o alternativ4  
        if (colisao4.length > 0) {

            //var id = $("#alternativa4").data("alternativa");
            //$("#p".concat(pergunta, id)).trigger("click");
            errada();

            //energiaAtual--;
            alternativa4X = parseInt($("#alternativa4").css("left"));
            alternativa4Y = parseInt($("#alternativa4").css("top"));

            explosao1(alternativa4X, alternativa4Y);
            $("#alternativa1").remove();
            $("#alternativa2").remove();
            $("#alternativa3").remove();
            $("#alternativa4").remove();

            reposicionaAlternativa1();
            reposicionaAlternativa2();
            reposicionaAlternativa3();
            reposicionaAlternativa4();
        }

        // raio com o alternativa1  
        if (colisao5.length > 0) {

            var funcao = $("#resposta1").attr("onclick");
            //var funcao = $("#resposta1");

            if (funcao == 'errada()') {
                errada();
            } else {
                certa();
            }

            //pontos = pontos+50;
            alternativa1X = parseInt($("#alternativa1").css("left"));
            alternativa1Y = parseInt($("#alternativa1").css("top"));

            $("#alternativa1").remove();
            $("#alternativa2").remove();
            $("#alternativa3").remove();
            $("#alternativa4").remove();

            explosao2(alternativa1X, alternativa1Y);
            $("#raio").css("top", -200);

            reposicionaAlternativa1();
            reposicionaAlternativa2();
            reposicionaAlternativa3();
            reposicionaAlternativa4();
        }

        // raio com o alternativa2  
        if (colisao6.length > 0) {

            var funcao = $("#resposta2").attr("onclick");

            if (funcao == 'errada()') {
                errada();
            } else {
                certa();
            }

            //energiaAtual--;
            alternativa2X = parseInt($("#alternativa2").css("left"));
            alternativa2Y = parseInt($("#alternativa2").css("top"));

            $("#alternativa1").remove();
            $("#alternativa2").remove();
            $("#alternativa3").remove();
            $("#alternativa4").remove();

            explosao2(alternativa2X, alternativa2Y);
            //$("#raio").css("top",alternativa2Y-10);
            $("#raio").css("top", -200);

            reposicionaAlternativa1();
            reposicionaAlternativa2();
            reposicionaAlternativa3();
            reposicionaAlternativa4();
        }

        // raio com o alternativa3  
        if (colisao7.length > 0) {

            var funcao = $("#resposta3").attr("onclick");

            if (funcao == 'errada()') {
                errada();
            } else {
                certa();
            }


            //energiaAtual--;
            alternativa3X = parseInt($("#alternativa3").css("left"));
            alternativa3Y = parseInt($("#alternativa3").css("top"));

            $("#alternativa1").remove();
            $("#alternativa2").remove();
            $("#alternativa3").remove();
            $("#alternativa4").remove();

            explosao2(alternativa3X, alternativa3Y);
            //$("#raio").css("top",alternativa3Y-10);
            $("#raio").css("top", -200);

            reposicionaAlternativa1();
            reposicionaAlternativa2();
            reposicionaAlternativa3();
            reposicionaAlternativa4();
        }

        // disparo com o alternativa4   
        if (colisao8.length > 0) {

            var funcao = $("#resposta4").attr("onclick");

            if (funcao == 'errada()') {
                errada();
            } else {
                certa();
            }

            //energiaAtual--;
            alternativa4X = parseInt($("#alternativa4").css("left"));
            alternativa4Y = parseInt($("#alternativa4").css("top"));

            $("#alternativa1").remove();
            $("#alternativa2").remove();
            $("#alternativa3").remove();
            $("#alternativa4").remove();

            explosao2(alternativa4X, alternativa4Y);
            //$("#raio").css("top",alternativa4Y-10);
            $("#raio").css("top", -200);

            reposicionaAlternativa1();
            reposicionaAlternativa2();
            reposicionaAlternativa3();
            reposicionaAlternativa4();
        }


    }   //Fim da função colisao() 


    //Explosão 1
    function explosao1(alternativaX, alternativaY) {

        somExplosao.play();
        $("#fundoGame").append("<div id='explosao1'></div>");
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");
        var div = $("#explosao1");
        div.css("top", alternativaY);
        div.css("left", alternativaX);
        div.animate({ height: 100, opacity: 0 }, "slow");
        var tempoExplosao = window.setInterval(removeExplosao1, 1000);

        function removeExplosao1() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    } // Fim da função explosao1()

    //Explosão 2
    function explosao2(alternativa1X, alternativa1Y) {

        somExplosao.play();
        $("#fundoGame").append("<div id='explosao2'></div>");
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");
        var div2 = $("#explosao2");
        div2.css("top", alternativa1Y);
        div2.css("left", alternativa1X);
        div2.animate({ height: 100, opacity: 0 }, "slow");
        var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

        function removeExplosao2() {
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;
        }
    } // Fim da função explosao2()

    //Reposiciona alternativa1
    function reposicionaAlternativa1() {
        var tempoColisao1 = window.setInterval(reposiciona1, 1000);

        function reposiciona1() {
            window.clearInterval(tempoColisao1);
            tempoColisao1 = null;

            if (fimdejogo == false) {
                $("#fundoGame").append("<div id=alternativa1 data-alternativa='1'></div>");
            }

            posicaoY = parseInt(Math.random() * 70);
            $("#alternativa1").css("top", posicaoY);
        }
    }

    //Reposiciona alternativa2
    function reposicionaAlternativa2() {
        var tempoColisao2 = window.setInterval(reposiciona2, 1000);

        function reposiciona2() {
            window.clearInterval(tempoColisao2);
            tempoColisao2 = null;

            if (fimdejogo == false) {
                $("#fundoGame").append("<div id=alternativa2 data-alternativa='2'></div>");
            }

            posicaoY = parseInt(Math.random() * 70);
            $("#alternativa2").css("top", posicaoY);
        }
    }

    //Reposiciona alternativa3
    function reposicionaAlternativa3() {
        var tempoColisao3 = window.setInterval(reposiciona3, 1000);

        function reposiciona3() {
            window.clearInterval(tempoColisao3);
            tempoColisao3 = null;

            if (fimdejogo == false) {
                $("#fundoGame").append("<div id=alternativa3 data-alternativa='3'></div>");
            }

            posicaoY = parseInt(Math.random() * 70);
            $("#alternativa3").css("top", posicaoY);
        }
    }

    //Reposiciona alternativa4
    function reposicionaAlternativa4() {
        var tempoColisao4 = window.setInterval(reposiciona4, 1000);

        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;

            if (fimdejogo == false) {
                $("#fundoGame").append("<div id=alternativa4 data-alternativa='4'></div>");
            }

            posicaoY = parseInt(Math.random() * 70);
            $("#alternativa3").css("top", posicaoY);
        }
    }
    // função energia()
    function energia() {

        if (energiaAtual == 3) {

            $("#energia").css("background-image", "url(imgs/energia3.png)");
        }
        if (energiaAtual == 2) {

            $("#energia").css("background-image", "url(imgs/energia2.png)");
        }
        if (energiaAtual == 1) {

            $("#energia").css("background-image", "url(imgs/energia1.png)");
        }
        if (energiaAtual == 0) {

            $("#energia").css("background-image", "url(imgs/energia0.png)");

            //Game Over
            gameOver();
            //verificaGameOver();

        }
    } // Fim da função energia()

    // função troca_alternativa()
    function troca_alternativa() {

        if (contadorPergunta - 2 < 5) {

            $('#alternativa1').css("background-image", "url(imgs/tubo_azul.png)");
            $('#alternativa2').css("background-image", "url(imgs/tubo_vermelho.png)");
            $('#alternativa3').css("background-image", "url(imgs/tubo_verde.png)");
            $('#alternativa4').css("background-image", "url(imgs/tubo_amarelo.png)");

        }

        if ((contadorPergunta - 2 >= 5) && (contadorPergunta - 2 < 10)) {

            $('#alternativa1').css("background-image", "url(imgs/atomo_azul.png)");
            $('#alternativa1').css("width", "50px");
            $('#alternativa1').css("height", "50px");
            $('#alternativa1').css("background-size", "50px 50px");
            $('#alternativa2').css("background-image", "url(imgs/atomo_vermelho.png)");
            $('#alternativa2').css("width", "50px");
            $('#alternativa2').css("height", "50px");
            $('#alternativa2').css("background-size", "50px 50px");
            $('#alternativa3').css("background-image", "url(imgs/atomo_verde.png)");
            $('#alternativa3').css("width", "50px");
            $('#alternativa3').css("height", "50px");
            $('#alternativa3').css("background-size", "50px 50px");
            $('#alternativa4').css("background-image", "url(imgs/atomo_amarelo.png)");
            $('#alternativa4').css("width", "50px");
            $('#alternativa4').css("height", "50px");
            $('#alternativa4').css("background-size", "50px 50px");
        }

        if ((contadorPergunta - 2 >= 10) && (contadorPergunta - 2 < 15)) {

            $('#alternativa1').css("background-image", "url(imgs/lampada_azul.png)");
            $('#alternativa1').css("width", "40px");
            $('#alternativa1').css("height", "50px");
            $('#alternativa1').css("background-size", "40px 50px");
            $('#alternativa2').css("background-image", "url(imgs/lampada_vermelha.png)");
            $('#alternativa2').css("width", "40px");
            $('#alternativa2').css("height", "50px");
            $('#alternativa2').css("background-size", "40px 50px");
            $('#alternativa3').css("background-image", "url(imgs/lampada_verde.png)");
            $('#alternativa3').css("width", "40px");
            $('#alternativa3').css("height", "50px");
            $('#alternativa3').css("background-size", "40px 50px");
            $('#alternativa4').css("background-image", "url(imgs/lampada_amarela.png)");
            $('#alternativa4').css("width", "40px");
            $('#alternativa4').css("height", "50px");
            $('#alternativa4').css("background-size", "40px 50px");
        }

        if ((contadorPergunta - 2 >= 15) && (contadorPergunta - 2 < 20)) {

            $('#alternativa1').css("background-image", "url(imgs/jarro_azul.png)");
            $('#alternativa1').css("width", "45px");
            $('#alternativa1').css("height", "50px");
            $('#alternativa1').css("background-size", "45px 50px");
            $('#alternativa2').css("background-image", "url(imgs/jarro_vermelho.png)");
            $('#alternativa2').css("width", "45px");
            $('#alternativa2').css("height", "50px");
            $('#alternativa2').css("background-size", "45px 50px");
            $('#alternativa3').css("background-image", "url(imgs/jarro_verde.png)");
            $('#alternativa3').css("width", "45px");
            $('#alternativa3').css("height", "50px");
            $('#alternativa3').css("background-size", "45px 50px");
            $('#alternativa4').css("background-image", "url(imgs/jarro_amarelo.png)");
            $('#alternativa4').css("width", "45px");
            $('#alternativa4').css("height", "50px");
            $('#alternativa4').css("background-size", "45px 50px");
        }

        if ((contadorPergunta - 2 >= 20) && (contadorPergunta - 2 < 25)) {

            $('#alternativa1').css("background-image", "url(imgs/microscopio_azul.png)");
            $('#alternativa1').css("width", "45px");
            $('#alternativa1').css("height", "55px");
            $('#alternativa1').css("background-size", "45px 55px");
            $('#alternativa2').css("background-image", "url(imgs/microscopio_vermelho.png)");
            $('#alternativa2').css("width", "45px");
            $('#alternativa2').css("height", "55px");
            $('#alternativa2').css("background-size", "45px 55px");
            $('#alternativa3').css("background-image", "url(imgs/microscopio_verde.png)");
            $('#alternativa3').css("width", "45px");
            $('#alternativa3').css("height", "55px");
            $('#alternativa3').css("background-size", "45px 55px");
            $('#alternativa4').css("background-image", "url(imgs/microscopio_amarelo.png)");
            $('#alternativa4').css("width", "45px");
            $('#alternativa4').css("height", "55px");
            $('#alternativa4').css("background-size", "45px 55px");
        }

        if (contadorPergunta - 2 >= 25) {

            $('#alternativa1').css("background-image", "url(imgs/planeta_azul.png)");
            $('#alternativa1').css("width", "45px");
            $('#alternativa1').css("height", "45px");
            $('#alternativa1').css("background-size", "45px 45px");
            $('#alternativa2').css("background-image", "url(imgs/planeta_vermelho.png)");
            $('#alternativa2').css("width", "45px");
            $('#alternativa2').css("height", "45px");
            $('#alternativa2').css("background-size", "45px 45px");
            $('#alternativa3').css("background-image", "url(imgs/planeta_verde.png)");
            $('#alternativa3').css("width", "45px");
            $('#alternativa3').css("height", "45px");
            $('#alternativa3').css("background-size", "45px 45px");
            $('#alternativa4').css("background-image", "url(imgs/planeta_amarelo.png)");
            $('#alternativa4').css("width", "45px");
            $('#alternativa4').css("height", "45px");
            $('#alternativa4').css("background-size", "45px 45px");

        }
        if (contadorPergunta - 2 >= 30) {

            $('#alternativa1').css("background-image", "url(imgs/at_azul.png)");
            $('#alternativa1').css("width", "45px");
            $('#alternativa1').css("height", "45px");
            $('#alternativa1').css("background-size", "45px 45px");
            $('#alternativa2').css("background-image", "url(imgs/at_vermelho.png)");
            $('#alternativa2').css("width", "45px");
            $('#alternativa2').css("height", "45px");
            $('#alternativa2').css("background-size", "45px 45px");
            $('#alternativa3').css("background-image", "url(imgs/at_verde.png)");
            $('#alternativa3').css("width", "45px");
            $('#alternativa3').css("height", "45px");
            $('#alternativa3').css("background-size", "45px 45px");
            $('#alternativa4').css("background-image", "url(imgs/at_amarelo.png)");
            $('#alternativa4').css("width", "45px");
            $('#alternativa4').css("height", "45px");
            $('#alternativa4').css("background-size", "45px 45px");

        }
        if (contadorPergunta - 2 >= 35) {

            $('#alternativa1').css("background-image", "url(imgs/atom_azul.png)");
            $('#alternativa1').css("width", "45px");
            $('#alternativa1').css("height", "45px");
            $('#alternativa1').css("background-size", "45px 45px");
            $('#alternativa2').css("background-image", "url(imgs/atom_vermelho.png)");
            $('#alternativa2').css("width", "45px");
            $('#alternativa2').css("height", "45px");
            $('#alternativa2').css("background-size", "45px 45px");
            $('#alternativa3').css("background-image", "url(imgs/atom_verde.png)");
            $('#alternativa3').css("width", "45px");
            $('#alternativa3').css("height", "45px");
            $('#alternativa3').css("background-size", "45px 45px");
            $('#alternativa4').css("background-image", "url(imgs/atom_amarelo.png)");
            $('#alternativa4').css("width", "45px");
            $('#alternativa4').css("height", "45px");
            $('#alternativa4').css("background-size", "45px 45px");

        }

    }// Fim da função troca_altenativa()

    // Função GAME OVER
    function gameOver() {

        fimdejogo = true;
        musica.pause();
        somGameover.play();
        somGameover2.play();
        somGameover.play();

        window.clearInterval(jogo.timer);
        jogo.timer = null;

        exibeScore();
        //alert("OKKKK");
        $("#mensagemScore").show();
        $("#fundoGame").remove();
        $("#fundoGame").children().remove();
        $("#info").remove();

        // Também pode ser necessário remover elementos específicos dentro do 'fundoGame' que não foram removidos pelo comando acima
        $("#fundoGame #resposta1, #fundoGame #resposta2, #fundoGame #resposta3, #fundoGame #resposta4").remove();
        $("#fundoGame #alternativa1, #fundoGame #alternativa2, #fundoGame #alternativa3, #fundoGame #alternativa4").remove();


        $("#cientista").remove();
        $("#pergunta").remove();
        $("#aluno").remove();
        $("#placar").remove();
        $("#placar1").remove();
        $("#energia").remove();
        $("#fundoGame").find("#resposta1").remove();
        $("#fundoGame").find("#resposta2").remove();
        $("#fundoGame").find("#resposta3").remove();
        $("#fundoGame").find("#resposta4").remove();
        $("#alternativa1").remove();
        $("#alternativa2").remove();
        $("#alternativa3").remove();
        $("#alternativa4").remove();


    } // Fim da função gameOver()

} // Fim da função start()

//Função VerificaResposta
function certa() {

    div1 = "#" + "pergunta" + pergunta;

    $(div1).hide();

    $('.numConPergunta').html(contadorPergunta);
    contadorPergunta++;

    acertos++;

    $("#placar").html("<h2>Acertos: " + acertos + "</h2>");

    pergunta = aleatorio(1, 26);
    while ((jQuery.inArray(pergunta, sorteadas) >= 0) && (sorteadas.length < 25)) {
        pergunta = aleatorio(1, 26);
    }
    //essa é a linha do erro a linha 909
    if (sorteadas.length == 25)
        alert("Você já viu todas, vai começar repetir")

    sorteadas.push(pergunta);

    console.log(sorteadas);
    console.log(pergunta);

    div2 = "#" + "pergunta" + pergunta;

    //$(div2).show();

    exibePergunta(pergunta)

    if ((contadorPergunta - 2) % 5 == 0) {
        velocidade = velocidade + 0.5;
    }

}

function errada() {

    div1 = "#" + "pergunta" + pergunta;
    $(div1).hide();

    $('.numConPergunta').html(contadorPergunta);
    contadorPergunta++;

    erros++;
    energiaAtual--;
    $("#placar1").html("<h2> Erros: " + erros + "</h2>");

    pergunta = aleatorio(1, 25);
    while ((jQuery.inArray(pergunta, sorteadas) >= 0) && (sorteadas.length < 25)) {
        pergunta = aleatorio(1, 25);
    }

    if (sorteadas.length == 25)
        alert("Você já viu todas, vai começar repetir")

    sorteadas.push(pergunta);

    console.log(sorteadas);
    console.log(pergunta);


    div2 = "#" + "pergunta" + pergunta;
    //$(div2).show();

    exibePergunta(pergunta)

    if ((contadorPergunta - 2) % 5 == 0) {
        velocidade = velocidade + 0.5;
    }

}

// Insere dados no banco e exibe o score
function exibeScore() {

    $.ajax({
        url: "../php/gravar_score.php?placar=" + acertos,
        type: 'GET',
        success: function (data) {
            //alert("Dados Salvos: " + data); 
        }
    });

    $.ajax({
        //pegando a url apartir do href do link
        url: "../php/exibe_score.php",
        type: 'GET',
        success: function (data) {
            $("#mensagemScore").html("<fieldset><legend>RANK - TOP 10</legend><ul><li>" + data + "</li></ul><legend>Click para Reiniciar!!!</legend></fieldset");
        }
    });
}

var myVar;

function mostraScore() {
    myVar = setTimeout(mostraFunc, 1000);
}

function mostraFunc() {
    $("#mensagemScore").hide();
    $("#mensagemFinal").show();
}

// Reinicia o Jogo
function reiniciaJogo() {

    //$("#mensagemScore").hide();
    somGameover.pause();
    location.reload();

}

