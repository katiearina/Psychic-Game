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

// Variable to write remaining guess count to page
var writeGuessesLeft = document.getElementById("guess-count");

// Variable to write game prompt to page
var writeGamePrompt = document.getElementById("game-prompt");
// Variable to remove game prompt from page
var clearGamePrompt = document.getElementById("game-prompt");

// Variable to write loss quote to page
var writeLossQuote = document.getElementById("psychic-quote");
var lossQuote = "&#8220;The ego of a god, the wit of a goldfish.&#8221;";
var lossQuoteSource = "Shah Wharton";

// Variable to write starting quote to page
var writeResetQuote = document.getElementById("psychic-quote");
var resetQuote = "&#8220;How many people here have telekinetic power? R[a]ise my hand&#8221;";
var resetQuoteSource = "Emo Philips";

// Variable to write win quote to page
var writeWinQuote = document.getElementById("psychic-quote");
var winQuote = "&#8220;Claircognizance is the ability to know without trying.&#8221;";
var winQuoteSource = "Lada Ray";

// Current user guess based on key press
var userGuess = null;
// Blank array to insert user guesses into
var userGuesses = [];
// Variable to write letters guessed to page
var writeGuesses = document.getElementById("letters-guessed");

//---------------------------------------------------------------------------
// FUNCTION DECLARATIONS!

// This function will select a new random letter
function computerGuess () {
	currentLetter = computerOptions[Math.floor(Math.random() * computerOptions.length)];
}

// This function will show the starting guess count
function guessesAtStart () {
	guessesLeft = 9;
	writeGuessesLeft.innerHTML = "<h2> You have " + guessesLeft + " guesses remaining.</h2>";
}

// This function writes remaining guess count to page
function writeNewGuessCount () {
	writeGuessesLeft.innerHTML = "<h2> You have " + guessesLeft + " guesses remaining.</h2>";
}

// This function takes key press, pushes to blank array, then writes to page
function writeGuessedLetters () {
	userGuesses.push(userGuess);
	writeGuesses.innerHTML = "<h2>" + (userGuesses.join(" ")) + "</h2>";
}

// This function resets the userGuess array on page to be blank
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

// This function writes game description to page
function writePrompt () {
	writeGamePrompt.textContent = "Guess What Letter I'm Thinking Of!";
}

// This function clears game description upon user guess
function clearPrompt () {
	clearGamePrompt.textContent = " ";
}

// This function shows a loss quote after player loses (this quote will
// stick around until they win or reset the game)
function showLossQuote () {
	writeLossQuote.innerHTML = "<p>" + lossQuote + '</p> <footer class="blockquote-footer">' + lossQuoteSource + "</footer>";
}

// This function shows the starting quote on opening the page or when
// the player resets the game with the "Start Over!" button
function showResetQuote () {
	writeResetQuote.innerHTML = "<p>" + resetQuote + '</p> <footer class="blockquote-footer">' + resetQuoteSource + "</footer>";
}

// This function shows a win quote after player loses (this quote will
// stick around until they lose or reset the game)
function showWinQuote () {
	writeWinQuote.innerHTML = "<p>" + winQuote + '</p> <footer class="blockquote-footer">' + winQuoteSource + "</footer>";
}

// This function starts game on page load
function gameStart () {
	wins = 0;
	writeWins.innerHTML = "<h2>Wins: " + wins + "</h2>";
	losses = 0;
	writeLosses.innerHTML = "<h2>Losses: " + losses + "</h2>";
	guessesAtStart();
	showResetQuote();
	computerGuess();
	resetGuessedLetters();
	writePrompt();
	// Console logs computer letter choice for testing
	console.log(currentLetter);
}

// This function will start the guess counts over on game win/loss condition
// Win/Loss Quote will show from previous round.
function resetGame() {
	guessesAtStart();
	computerGuess();
	writePrompt();
	// Console logs computer letter choice for testing
	console.log(currentLetter);
	userGuesses = [];
	resetGuessedLetters();
}

//---------------------------------------------------------------------------
// ACTUAL GAME BITS!

// Starts new game on page load or refresh
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
	// Shows list of letters guessed
	writeGuessedLetters();
	// Console logs guess array for testing
	console.log(userGuesses);
	clearPrompt();

	// If there are still guesses left and player guesses correct letter,
	// player wins and guess count resets to 9.
	if (guessesLeft > 0) {
		if (userGuess === currentLetter) {
		alert("You've done it!");
		wins++;
		writeNewWinCount();
		showWinQuote();
		userGuesses = [];
		writeGuessedLetters();
		resetGame();
	}
}
	// If there are no guesses left, player loses and guess count resets to 9.
	else if (guessesLeft === 0) {
		losses++;
		writeNewLossCount();
		showLossQuote();
		alert("Oh No! Bad Luck.");
		resetGame();
	}
}