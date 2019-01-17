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
// - As a dice game designer, I need to allow the user to stop the game at any point
// - As a dice game designer, I want the screen to erase any dice showing when the user exits
// - As a developer, I want to ALSO try to learn how to display and 
//		hide the dice faces if the user selects 6 faces and 6 or fewer dice - in order to 
//		add a little "fun" factor, at least for the traditional game
// - As a student, I want to figure out EITHER 
//		a) why the images of the dice do not display & hide as expected, OR
//		b) how to program around this issue.


// Based on what I know of the game of 21 played with two dice, a winning score is
// 14 or higher and 21 or less - but to add a little challenge, 
// I changed it to 16 or higher.  If the player exceeds 21, they lose.
// Thus it appears that the game is won by 
// getting more than (numOfDice * numOfSidesOnDice) + (2/3 * the numOfSidesOnDice)
// and not getting a score greater than (numOfSidesOnDice + 1) * (numOfDice * 1.5)

// As of this push, the dice will not display on Safari & IE 
// UNLESS you set a breakpoint(!!!), or after you exit the game
// To test this, place a breakpoint on the return at the very bottom of this file,
// currently line 283
// Further, the dice do not disappear/hide until some time later, or 
// after you move the focus off of the browser & then back to the browser.


function playDiceGame (){
	
	// --------------- test area for dice visibility
	
	// displayOrHideDie(1, 4, true);
	// displayOrHideDie(2, 5, true);
	// hideDice();
	// displayOrHideDie(1, 1, false);
	// displayOrHideDie(2, 2, false);
	// hideDice();

	//  alert("after test area");

	// --------------- end test area for dice visibility

	// Get the parameters from the user - number of dice, number of faces on dice
	let numOfDice = Number(prompt("Enter the number of dice to play with: ", 2));
	if (numOfDice === 0) {return;}
	let numOfSidesOnDice = Number(prompt("Enter number of sides on the dice: ", 6));
	if (numOfSidesOnDice === 0) {return;}
	let lowerLimit = (numOfDice * numOfSidesOnDice) + Math.floor(2/3 *  numOfSidesOnDice);
	let upperLimit = (numOfSidesOnDice + 1) * (numOfDice * 1.5);
	// Alert the user of the boundaries of a winning roll based on those parameters
	let rollAgain = confirm("Based on " + numOfDice + " dice each having " + numOfSidesOnDice + 
		" sides, you must score " + lowerLimit + " or more, AND " + upperLimit + 
		" or less. Click OK to roll the dice, or Cancel to cancel:");
	if (rollAgain === 0) {return;}
	
	// prepare for first roll & first time through the loop
	let gameOver = false;
	let userWon = false;
	let firstRoll = true;
	let gameScore = 0;
	let rollResults = [];
	let previousDiceRoll = [];
	let rollTotal = 0;		
	
	// Play the game until the user selects cancel
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
		// store the previous roll results for hiding the dice before showing new roll
		previousDiceRoll = rollResults;

		// roll the dice
		rollResults = rollDice(numOfDice, numOfSidesOnDice);
		
		// if we're using 6-sided dice and there are 6 or fewer dice, we can show them
		// and hide the previous dice roll (if there was one)
		if (numOfDice <= 6 && numOfSidesOnDice == 6) {
			show6SidedDiceRoll (rollResults, previousDiceRoll);
		}

		// total this roll
		rollTotal = rollResults.reduce(function(total,el){
			return total + el;
		});
		console.log("rollResults = " + rollResults + "  rollTotal = " + rollTotal);
		// add this roll to the game score thus far
		gameScore = gameScore + rollTotal;

		// construct the message for the user
		// one of three conditions can exist:
		// score is between lower & upper limit inclusive; the user won, game over
		// score is greater than upper limit; the user lost, game over
		// score is less than lower limit, so the user can roll again
		let rollResultsString = "You rolled " + rollResults + ", which adds up to " + rollTotal + ". Your score is " + gameScore + ". ";
		if ((gameScore >= lowerLimit && gameScore <= upperLimit)) {
			gameOver = true;
			userWon = true;
			rollResultsString = rollResultsString + "You won! Congratulations!  Select Cancel to quit, or Okay for a new game.";
			console.log("won");
		}
		else if (gameScore > upperLimit) {
			gameOver = true;
			userWon = false;
			rollResultsString = rollResultsString + "Sorry, you lost. Better luck next time!  Select Cancel to quit, or Okay for a new game.";
			console.log("lost");
		}
		// else the user can roll again

		// display the message to the user
		rollAgain = confirm (rollResultsString);
		
		// if game is over but they want to play again, reset the values
		if (gameOver === true && rollAgain === true) {
			// reset game parameters
			gameOver = false;
			userWon = false;
			firstRoll = true;
			gameScore = 0;
			rollTotal = 0;
		}
	}
	// // Clean up before exit
	if (numOfDice <= 6 && numOfSidesOnDice == 6) {
		hideDice();
	}
}

// function to hide all dice
function hideDice() {	
	// loop through dice, setting source to ""
	for (let i = 1; i <= 6; i++) {
		displayOrHideDie(1, i, false);
	}
	return;
}

// function to hide previous roll
function hidePreviousDiceRoll(thisDiceRoll = []) {
	// loop through array hidinbg the dice rolled
	for (let i = 0; i < thisDiceRoll.length; i++) {
		//showOrHideDie(i + 1, thisDiceRoll[i], false);
		//displayOrHideDie(thisDiceRoll[i], i+1, false);
		displayOrHideDie(1, i+1, false);
	}
	return;
}

// function to generate a random number from 1 to the numberOfSides
// returns an integer
function rollOneDie(numberOfSides = 6) {
	return Math.floor(Math.random() * numberOfSides) + 1;
}

// function to generate a number of random numbers, from 1 to the numberOfSides
// Returns an array of integers.
function rollDice(numberOfDice = 1, numberOfSides = 6) {	
	let diceArray = [];
	for (let i = 0; i < numberOfDice; i++) {
		let diceRoll = rollOneDie(numberOfSides);
		diceArray.push(diceRoll);
	}
	console.log("diceArray = " + diceArray);
	return diceArray;
}

// show the images of a 6-sided dice roll
function show6SidedDiceRoll(thisDiceRoll = [], previousDiceRoll = []) {
	
	// hide the dice
	//hideDice();
	hidePreviousDiceRoll(previousDiceRoll);
		
	// loop through array showing the dice rolled
	for (let i = 0; i < thisDiceRoll.length; i++) {
		//showOrHideDie(i + 1, thisDiceRoll[i], true);
		displayOrHideDie(thisDiceRoll[i], i+1, true);
	}
	return true;
}

// // function to display or hide a single die given row, column (column = die face)
// function showOrHideDie(rowToShow, columnToShow, showTrueHideFalse) {
	
// 	// object with visibility experiment, same results
// 	// let thisObj = document.getElementById("row" + rowToShow + "Col" + columnToShow + "Die" + columnToShow);
// 	// thisObj.style.visibility = "visible";
	
// 	console.log("in showOrHideDie " + rowToShow + ", " + columnToShow);

// 	// visibility
// 	//document.getElementById("row" + rowToShow + "Col" + columnToShow + "Die" + columnToShow).style.visibility = "visible"; // visible or hidden
// 	// display
	
// 	// if showTrueHideFalse is true, show, else hide
// 	if (showTrueHideFalse === true) {
// 		document.getElementById("row" + rowToShow + "Col" + columnToShow + "Die" + columnToShow).style.display = "block"; // none or block, or inline

// 		//document.getElementById("imageid").src="../template/save.png";
// 		document.getElementById("row" + rowToShow + "Col" + columnToShow + "Die" + columnToShow).src = "dice1.jpg"
// 	}
// 	else {
// 		document.getElementById("row" + rowToShow + "Col" + columnToShow + "Die" + columnToShow).style.display = "none"; // none or block
// 	}
	
// 	// tried to set focus to this window to get dice to be displayed 
// 	// but that did not work either
// 	// let thisWindow = document.getElementById("windowDice");
// 	// thisWindow.focus();

// 	// tried to give it a 1/2 second timeout to get dice to be displayed 
// 	// but that did not work either
// 	// console.log("before timeout");
// 	// setTimeout(function(){console.log("in timeout");}, 500);
// 	// console.log("after timeout");
	
// 	// put breakpoint here to get the dice to show!!! ????	
// 	return;
// }

// function to show or "hide" a single die
function displayOrHideDie(result, dieNumber, displayTrueHideFalse){
	dieNumber = dieNumber.toString();
	
	// if showing file, set the file name to dice#.jpg 
	// otherwise we are hiding file, set the file name to ""
	let sourceFile = "";
	if(displayTrueHideFalse === true) {
		sourceFile = "dice" + result.toString() + ".jpg";
	}

	switch(result)
	{
		case 1:
			document.getElementById("row1Die" + dieNumber).src = sourceFile;
			//document.getElementById("row1Die" + dieNumber).src = "dice1.jpg";
			break;
		case 2:
			document.getElementById("row1Die" + dieNumber).src = sourceFile;
			//document.getElementById("row1Die" + dieNumber).src = "dice2.jpg";
			break;
		case 3:
			document.getElementById("row1Die" + dieNumber).src = sourceFile;
			//document.getElementById("row1Die" + dieNumber).src = "dice3.jpg";
			break;
		case 4:
			document.getElementById("row1Die" + dieNumber).src = sourceFile;
			//document.getElementById("row1Die" + dieNumber).src = "dice4.jpg";
			break;
		case 5:
			document.getElementById("row1Die" + dieNumber).src = sourceFile;
			//document.getElementById("row1Die" + dieNumber).src = "dice5.jpg";
			break;
		case 6:
			document.getElementById("row1Die" + dieNumber).src = sourceFile;
			//document.getElementById("row1Die" + dieNumber).src = "dice6.jpg";
			break;
	}
	return;
}

