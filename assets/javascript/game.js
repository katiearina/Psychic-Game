//---------------------------------------------------------------------------
// VARIABLE DECLARATIONS!

// These are the letters the computer can choose from
var computerOptions = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
// This is the current computer letter choice (random)
var currentLetter = null;

// Starting win count
var wins = 0;
// Variable to write wins to page
var writeWins = document.getElementById("win-count");

// Starting loss count
var losses = 0;
// Variable to write losses to page
var writeLosses = document.getElementById("loss-count");

// Starting guess count
var guessesLeft = 9;
// Variable to write guess updates to page
var writeGuessesLeft = document.getElementById("guess-count");

var writeGuesses = document.getElementById("letters-guessed");

// Variable to write quote to page
var writeLossQuote = document.getElementById("psychic-quote");
var lossQuote = "&#8220;The ego of a god, the wit of a goldfish.&#8221;";
var writeResetQuote = document.getElementById("psychic-quote");
var resetQuote = "&#8220;How many people here have telekinetic power? Raise my hand&#8221;";
var writeWinQuote = document.getElementById("psychic-quote");
var winQuote = "&#8220;Claircognizance is the ability to know without trying.&#8221;";

var createPlayButton = document.getElementById("button-play");

// Current user guess based on key press
var userGuess = null;
// Blank array to insert user guesses in
var userGuesses = [];

//---------------------------------------------------------------------------
// FUNCTION DECLARATIONS!

// This function will select a new random letter
function computerGuess () {
	currentLetter = computerOptions[Math.floor(Math.random() * computerOptions.length)];
}

// This function will allow the starting guess count
function guessesAtStart () {
	guessesLeft = 9;
	writeGuessesLeft.innerHTML = "<h2> You have " + guessesLeft + " guesses remaining.</h2>";
}

// This function writes new guess count to page
function writeNewGuessCount () {
	writeGuessesLeft.innerHTML = "<h2> You have " + guessesLeft + " guesses remaining.</h2>";
}

function writeGuessedLetters () {
	userGuesses.push(userGuess);
	writeGuesses.innerHTML = "<h2>" + (userGuesses.join(" ")) + "</h2>";
}

function resetGuessedLetters () {
	writeGuesses.innerHTML = "<h2> </h2>";
}


// This function writes new win count to page
function writeNewWinCount () {
	writeWins.innerHTML = "<h2>Wins: " + wins + "</h2>";
}

// This function writes new loss count to page
function writeNewLossCount () {
	writeLosses.innerHTML = "<h2>Losses: " + losses + "</h2>";
}

function showLossQuote () {
	writeLossQuote.innerHTML = "<p>" + lossQuote + "</p>";
}

function showResetQuote () {
	writeResetQuote.innerHTML = "<p>" + resetQuote + "</p>";
}

function showWinQuote () {
	writeWinQuote.innerHTML = "<p>" + winQuote + "</p>";
}

function showPlayAgain () {
	createPlayButton.innerHTML = '<button type="button" onclick="resetGame()" class="btn btn-default">Play Again!</button>';
}

// Starts game on page load
function gameStart () {
	wins = 0;
	writeWins.innerHTML = "<h2>Wins: " + wins + "</h2>";
	losses = 0;
	writeLosses.innerHTML = "<h2>Losses: " + losses + "</h2>";
	guessesAtStart();
	showResetQuote();
	computerGuess();
	resetGuessedLetters();
	console.log(currentLetter);
}

// This function will start the guess counts over on game win/loss condition
function resetGame() {
	guessesAtStart();
	computerGuess();
	console.log(currentLetter);
	userGuesses = [];
	resetGuessedLetters();
	showResetQuote();
}

//---------------------------------------------------------------------------
// ACTUAL GAME BITS!

// Starts new game on page load
gameStart();

// Once user presses a key
document.onkeyup = function() {
	userGuess = String.fromCharCode(event.keyCode);
	// Guesses remaining decreases by 1
	guessesLeft--;
	// Writes new guesses remaining to page
	writeNewGuessCount();
	// Console logs key press for testing
	console.log(userGuess);
	writeGuessedLetters();
	console.log(userGuesses);

	// While there are still guesses left
	if (guessesLeft > 0) {
		if (userGuess === currentLetter) {
		alert("You've done it! Press Play Again to Keep Playing!");
		wins++;
		writeNewWinCount();
		showWinQuote();
		showPlayAgain();
		userGuesses = [];
		writeGuessedLetters();
		// Currently using button -- may change this.
		// resetGame();
	}
}
	else if (guessesLeft === 0) {
		losses++;
		writeNewLossCount();
		showLossQuote();
		alert("Oh No! Bad Luck. Press Play Again to Keep Playing!");
		// Currently using button -- may change this.
		// resetGame();
	}
}