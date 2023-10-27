var buttonColors = ["red","blue","yellow","green"];
var gamePattern = [];
var userPattern = [];
var gameStart = false;
var gameLevel = 0;

$(document).keypress(function() {
    $("p").slideUp();
    if (gameStart == false) {
        gameStart = true;
        nextSequence();
    }
});
$("button").click(function() {
    $("p").slideToggle();
})

function nextSequence() {
    gameLevel++;
    userPattern = [];
    $("#level-title").text ("Level " + gameLevel);
    var randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    verdict(userPattern.length - 1);
})

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

function verdict(curLevel) {
    if (gamePattern[curLevel] === userPattern[curLevel]) {
        if (gamePattern.length == userPattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }else {
        $("#level-title").text("Game over, press any key to restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },100);
        gameLevel = 0;
        gamePattern = [];
        gameStart = false;
    }
}

function playSound(randomChosenColor) {
    var audio = new Audio("music/" + randomChosenColor + ".mp3");
    audio.play();
}