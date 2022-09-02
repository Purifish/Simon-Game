//============================================================================================
/*
  Variable Initialization
*/
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameHasStarted = false;
var level = 0;
//============================================================================================

//============================================================================================
/*
  Functions
*/
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber]; // choose a colour randomly
  gamePattern.push(randomChosenColour); // append it to the game pattern
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100); // flash the corresponding button
  playSound(randomChosenColour); // play the corresponding sound
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    if (userClickedPattern.length === gamePattern.length) // User completed a level
    {
      setTimeout(nextSequence, 1000);
      userClickedPattern = []; // Reset user's pattern to prep for next level
    }
  }
  else
  {
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  gameHasStarted = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}
//============================================================================================

//============================================================================================
/*
  Event Listeners:
*/
$(".btn").on("click", function(e) {
  if (!gameHasStarted) // ignore clicks if the game has not yet started
    return;
  var userChosenColour = this.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

$(document).on("keydown", function(e) {
  if (!gameHasStarted)
  {
    gameHasStarted = true;
    nextSequence();
  }
})
//============================================================================================
