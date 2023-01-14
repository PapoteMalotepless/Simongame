var colors = ["red", "blue", "green", "yellow"] //Array para almacenar colores.
var gameSequence= []; //Array que guardará los colores generados por el juego.
var secuenciausuario = []; //Array que guardará la secuencia generada por el jugador.
var lvl = 0; //Nivel que está jugando el usuario, siendo el primero el cero.
var start = false;

function  nextStepSequence () {
    lvl++;
    $("h1").text("level "+ lvl);
    secuenciausuario= [];
    var randomNumber = Math.floor(Math.random() *4);
    var randomColor = colors[randomNumber];
    gameSequence.push(randomColor);
//Seleccionar id del color + efecto.

$("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomColor);
return;
}

$(document).keydown(function () {
    if (!start) {
      nextStepSequence();
      start = true;
    }
  });

$("div.btn").click(function () {
    if (start === true) { 
 var userChoosenColor = this.id;
 secuenciausuario.push(userChoosenColor);
 playSound(userChoosenColor);
 animatePress(userChoosenColor);
 checkAnswer();
    }
});
 
function playSound(randomColor) {
var audio = new Audio("./sounds/" +randomColor+".mp3");
audio.play();
}

function animatePress(color){
    $("#" + color).addClass("pressed");
    setTimeout(function(){
    $("#" + color).removeClass("pressed");
    }, 100);
}

function checkAnswer(){
 var lastchoice= secuenciausuario.length-1;
 if(secuenciausuario[lastchoice] ===  gameSequence[lastchoice]) {
    if (secuenciausuario.length === gameSequence.length)
        setTimeout(function(){
            nextStepSequence();
        },1000);
        
    }

 else {playSound("wrong");
 $("body").addClass("game-over");
 setTimeout(function() {
    $("body").removeClass("game-over");
 }, 200);
 $("h1").text("Game Over, Press Any Key to Restart");
 startOver();
 }
}


function startOver(){
    lvl=0;
    start=false;
    gameSequence= [];
}