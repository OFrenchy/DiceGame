"use strict";

// Assignment 2, week 2
// There is no requirement for a front end on this project!
// - (15 points): As a developer, I want to come up with a game concept played with dice, 
// 		ensuring that my game concept is more complicated than “War”.
// - (15 points): As a developer, I want my game to have gameplay functionality.
// - (10 points): As a developer, I want to have one function capable of “rolling a die” 
// 		(by generating a random number), regardless of the number of sides.
// - (10 points): As a developer, I want to utilize six different dice within my game. 
// 		(Recommended dice are 4-sided, 6-sided, 8-sided, 10-sided, 12-sided, and 20-sided. Different dice may be substituted. No 2-sided die.)
// - (5 points): As a developer, I want to make consistent commits accompanied with good, 
// 		descriptive commit messages.

// - As a dice game designer, I need to design a game that will be enjoyable to the user.
// - As a dice game designer, I need to alert the user to the rules
// - As a dice game designer, I want to allow the user to choose 
// 		the number of dice and the number of faces on each die
// - As a dice game designer, I need to calculate the range of a winning score


// two die:  must beat 14, but not exceed 21
// thus it appears that the game is won by 
// getting more than (numOfDice * numOfSidesOnDice) + (1/3 * the numOfSidesOnDice)
// and not getting a score greater than (numOfSidesOnDice + 1) * (numOfDice * 1.5)




// function to hide the dice
function hideDice() {
	
	// loop through rows
	for (let i = 1; i <= 2; i++) {
		// loop through dice
		for (let i2 = 1; i2 <= 6; i2++) {
			document.getElementById("row" + i + "Col" + i2 + "Die" + i2).style.visibility = "hidden"; // visible or hidden
			// document.getElementById("row1col1Die1").style.display = "none";
			// console.log("test", document.getElementById("row1col1Die1").style.display);
			// using display property
			// image items instead of columns
			// document.getElementById("die1").style.visibility = "hidden"; // visible or hidden
		}
	}
	return;
}

// function to display a single die given row, column (column = die face)
function showDie(rowToShow, columnToShow) {
	// confirm("row" + rowToShow + "Col" + columnToShow + "Die" + columnToShow);
	document.getElementById("row" + rowToShow + "Col" + columnToShow + "Die" + columnToShow).style.visibility = "visible"; // visible or hidden
	return;
}

function playDiceGame (){

	// Hide the dice
	hideDice();
	
	// test area for dice visibility

	// showDie(1, 1);
	// showDie(2, 2);
	// hideDice();
	// showDie(1, 4);
	// showDie(2, 5);
	// hideDice();

	// alert("after test area");

	// end test area for dice visibility

	// Get the parameters from the user - number of dice 
	let numOfDice = Number(prompt("Enter the number of dice to play with: ", 2));
	if (numOfDice === 0) {return;}
	let numOfSidesOnDice = Number(prompt("Enter number of sides on the dice: ", 6));
	if (numOfSidesOnDice === 0) {return;}
	let lowerLimit = (numOfDice * numOfSidesOnDice) + Math.floor(1/3 *  numOfSidesOnDice);
	let upperLimit = (numOfSidesOnDice + 1) * (numOfDice * 1.5);
	// Alert the user of the boundaries of a winning roll based on those parameters
	let rollAgain = confirm("Based on " + numOfDice + " dice each having " + numOfSidesOnDice + 
		" sides, you must score " + lowerLimit + " or more, AND " + upperLimit + 
		" or less. Click OK to roll the dice, or Cancel to cancel:");
	if (rollAgain === 0) {return;}
	
	let gameOver = false;
	let userWon = false;
	let firstRoll = true;
	let gameScore = 0;
	let rollResults = 0;
	let rollTotal = 0;
	
	//buttonDie1
	//document.getElementById("buttonDie1").style.visibility = "hidden";
	let thisElement = document.getElementById("buttonDie1") //.style.visibility = "hidden";

	while (gameOver === false && rollAgain === true) {
		// prompt the user for a roll
		if (firstRoll == true) {
			firstRoll = false;
		}
		else {
			rollAgain = confirm("Roll the dice!");
		}	
		if (rollAgain == false) {
			return;
		}
		rollResults = rollDice(numOfDice, numOfSidesOnDice);
		rollTotal = rollResults.reduce(function(total,el){
			return total + el;
		});
		console.log(rollResults, rollTotal);
		gameScore = gameScore + rollTotal;
		let rollResultsString = "You rolled " + rollResults + ", which adds up to " + rollTotal + ". Your score is " + gameScore + ". ";

		// one of three conditions can exist:
		// score is between lower & upper limit inclusive; the user won, game over
		// score is greater than upper limit; the user lost, game over
		// score is less than lower limit, so the user can roll again
		if ((gameScore >= lowerLimit && gameScore <= upperLimit)) {
			gameOver = true;
			userWon = true;
			rollResultsString = rollResultsString + "You won! Congratulations!";
			console.log("won");
		}
		else if (gameScore > upperLimit) {
			gameOver = true;
			userWon = false;
			rollResultsString = rollResultsString + "Sorry, you lost. Better luck next time!";
			console.log("lost");
		}
		// else the user can roll again

		rollAgain = confirm (rollResultsString);
	}
}

// function to generate a random number from 1 to the numberOfSides
// returns an integer
function rollOneDie(numberOfSides = 6) {
	return Math.floor(Math.random() * numberOfSides) + 1;
}

// function to generate a number of random numbers, from 1 to the numberOfSides
// returns an array of integers
function rollDice(numberOfDice = 1, numberOfSides = 6) {
	hideDice;
	let diceArray = [];
	for (let i = 0; i < numberOfDice; i++) {
		//diceArray.push( rollOneDie(numberOfSides));
		let diceRoll = rollOneDie(numberOfSides);
		if (numberOfDice == 2 && numberOfSides == 6) {
			showDie(i + 1, diceRoll);
		}
		diceArray.push(diceRoll);
	}
	console.log(diceArray);
	return diceArray;
}

