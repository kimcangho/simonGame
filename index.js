//Front End Elements

//Create game and player sequence arrays
var gameSequence = new Sequence("Game");
var playerSequence = new Sequence("Player");

//Start Game Button
function clickToStart() {
  $("h1").click(function() {
    //Reset sequences
    gameSequence.reset();
    playerSequence.reset();
    //Play next color in sequence
    gameTurn(gameSequence, playerSequence);
  });

}

// Button Press Function
function clickButton() {
  $(".btn").click(function(event) {
    //Get button color from id
    var buttonColor = event.target.id;
    //Play sound and animation based on color
    playerTurn(buttonColor, playerSequence);
    //Check if last playerSequence element matches last gameSequence element
    sequenceCheck(gameSequence, playerSequence);
  });
}

//Game turn
function gameTurn(gameSequence, playerSequence) {
  //Generate new random color
  color = colorGenerator();
  //Add color to game sequences
  gameSequence.addColor(color);
  console.log("Game input " + color + ", array length is " + gameSequence.pattern.length);
  //Update h1 header
  changeH1("Level " + (gameSequence.pattern.length));
  //Playback most recent game sequence color
  latestButton(gameSequence);

}

//Player turn
function playerTurn(color, playerSequence) {
  selectColor(color);
  playerSequence.addColor(color);
  console.log("Player input " + color + ", array length is " + playerSequence.pattern.length);
}

//Button Press - Game
function autoColor(descriptor) {
  switch (descriptor) {
    case "green":
      playSound(descriptor);
      toggleFades(".btn." + descriptor);
      break;
    case "red":
      playSound(descriptor);
      toggleFades(".btn." + descriptor);
      break;
    case "yellow":
      playSound(descriptor);
      toggleFades(".btn." + descriptor);
      break;
    case "blue":
      playSound(descriptor);
      toggleFades(".btn." + descriptor);
      break;
    default:
      alert("Error in fade event list!");
  }
}

//Button Press - Player
function selectColor(descriptor) {
  switch (descriptor) {
    case "green":
      playSound(descriptor);
      togglePressed(".btn." + descriptor, "pressed");
      break;
    case "red":
      playSound(descriptor);
      togglePressed(".btn." + descriptor, "pressed");
      break;
    case "yellow":
      playSound(descriptor);
      togglePressed(".btn." + descriptor, "pressed");
      break;
    case "blue":
      playSound(descriptor);
      togglePressed(".btn." + descriptor, "pressed");
      break;
    default:
      alert("Error in click event list!");
  }
}


//Animations

//Button click animation
function togglePressed(targetElement, newClass) {
  //Toggle on newClass
  $(targetElement).toggleClass(newClass);
  //Toggle off newClass
  setTimeout(function() {
    $(targetElement).toggleClass(newClass);
  }, 250);
}

//Button fade toggle animation
function toggleFades(targetElement) {
  //Toggle on newClass
  $(targetElement).fadeToggle();
  //Toggle off newClass
  setTimeout(function() {
    $(targetElement).fadeToggle();
  }, 200);
}

//Sounds
function playSound(soundDescriptor) {
  switch (soundDescriptor) {
    case "green":
      var greenAudio = new Audio("sounds/green.mp3");
      greenAudio.play();
      break;
    case "red":
      var redAudio = new Audio("sounds/red.mp3");
      redAudio.play();
      break;
    case "yellow":
      var yellowAudio = new Audio("sounds/yellow.mp3");
      yellowAudio.play();
      break;
    case "blue":
      var blueAudio = new Audio("sounds/blue.mp3");
      blueAudio.play();
      break;
    case "wrong":
      var wrongAudio = new Audio("sounds/wrong.mp3");
      wrongAudio.play();
      break;
    default:
      alert("Error in playSound(soundDescriptor)!");
  }
}

//Change h1 text
function changeH1(newText) {
  $("h1").html(newText);
}

//Game over prompt
function gameOver(gameSequence) {
  //Game over red screen of death
  togglePressed("body", "game-over");
  if (gameSequence.pattern.length === 0) {
    changeH1("Game Over! \nPress to play again!");
  } else {
    changeH1("Game Over at Level " + gameSequence.pattern.length + "!\nPress to play again!");
  }
  playSound("wrong");
}

//Color generator
function colorGenerator() {
  var colorNumber = numberGenerator();

  //Assign color to number value
  switch (colorNumber) {
    case 0:
      color = "green";
      break;
    case 1:
      color = "red";
      break;
    case 2:
      color = "yellow";
      break;
    case 3:
      color = "blue";
      break;
    default:
      alert("Error in colorGenerator()!")
  }
  return color;
}
//Random number generator
function numberGenerator() {
  var randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}

//Constructor Function for color sequences
function Sequence() {
  this.pattern = [];
  this.reset = function() {
    this.pattern = [];
  }
  this.addColor = function(color) {
    this.pattern.push(color);
  }
}

//Play most recent game sequence
function latestButton(gameSequence) {
  var gameColor = gameSequence.pattern[gameSequence.pattern.length - 1];
  setTimeout(function() {
    autoColor(gameColor);
  }, 500);
}

//Check player sequence against game sequences
function sequenceCheck(gameSequence, playerSequence) {
  //Set array index
  var arrIndex = (playerSequence.pattern.length - 1);
  // console.log("Index: " + arrIndex + ", playerArray = " + playerSequence.pattern.length + ", gameArray = " + gameSequence.pattern.length);
  //Check last index value between player and game sequences
  if (playerSequence.pattern[arrIndex] === gameSequence.pattern[arrIndex]) {
    var checkMatch = true;
  } else {
    var checkMatch = false;
  }

  //Confirm match
  if (checkMatch === false) {
    gameOver(gameSequence);
  } else if (checkMatch === true) {
    //Check player sequence length against game sequence length
    if (playerSequence.pattern.length === gameSequence.pattern.length) {
      gameTurn(gameSequence, playerSequence);
      playerSequence.reset();
    } else {
      //Pass
    }
  }

}


//Initiate new game
clickToStart();
clickButton();
