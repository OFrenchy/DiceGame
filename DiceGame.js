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


function playDiceGame (){

	
	alert(rollDice(6,6));
alert(rollDice(6,6));
alert(rollDice(6,6));
alert(rollDice(6,6));
alert(rollDice(6,6));


}

// function to generate a random number from 1 to the numberOfSides
// returns an integer
function rollOneDie(numberOfSides = 6) {
	return Math.floor(Math.random() * (numberOfSides + 1));
}

// function to generate a number of random numbers, from 1 to the numberOfSides
// returns an array of integers
function rollDice(numberOfDice = 1, numberOfSides = 6) {
	let diceArray = [];
	for (let i = 0; i < numberOfDice; i++) {
		diceArray.push( rollOneDie(numberOfSides));
	}
	console.log(diceArray)
	return diceArray;


}