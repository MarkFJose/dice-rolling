/*
author:	Mark Jose
date:	07/14/2024
notes:	Final Project COMP 2132
*/

let userScore = 0, compScore = 0;
let turnNum = 1;
let userDice1, userDice2, compDice1, compDice2;
const minCeiled = Math.ceil(1);
const maxFloored = Math.max(6);
let playerTurn = true;
let outcomeString = ``;
let outcomeVal = 0;

const whoTurnElem = document.getElementById(`whoTurn`);
const userScoreElem = document.getElementById(`userScore`);
const compScoreElem = document.getElementById(`compScore`);
const turnNumElem = document.getElementById(`turnNum`);
const outcomeStringElem = document.getElementById(`outcomeString`);

let diceGame = {
    turn_number: turnNum,
    user_score: userScore,
    comp_score: compScore,
    player_turn: true
};

$(document).ready(function(){
    resetGame();
})

$(`#btn1`).click(function(){
    if (diceGame.player_turn){
        userTurn();
    }
})


const spin = [
    { transform: "rotate(0)" },
    { transform: "rotate(360deg)" },
];
  
const spinTime = {
    duration: 750,
    iterations: 1,
};

const rollDice = document.querySelector("#btn1");

rollDice.addEventListener("click", () => {
    rollDice.animate(spin, spinTime);
});
  

$(`#btn2`).click(function(){
    resetGame();
})


function userTurn(){
    whoTurnElem.innerHTML = "User's Turn";
    userDice1 = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    userDice2 = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    outcomeString = ``;
    outcomeVal = 0;
    $(`#firstUserDice`).attr("src", `images/dice-images/dice-six-faces-${userDice1}.png`);
    $(`#secondUserDice`).attr("src", `images/dice-images/dice-six-faces-${userDice2}.png`);   
    if (userDice1 == 1 || userDice2 == 1) {
        outcomeString = `Sorry, you rolled a 1. You get nothing...`;
    } else if (userDice1 == userDice2){
        outcomeString = `Both dice rolled ${userDice1}! Double Multiplier!`;
        outcomeVal = (userDice1 + userDice2) * 2;
    } else {
        outcomeString = `You rolled a ${userDice1} and a ${userDice2}. Total is ${userDice1 + userDice2}`;
        outcomeVal = (userDice1 + userDice2);
    }
    diceGame.user_score = diceGame.user_score + outcomeVal;
    diceGame.player_turn = false;
    $(`#userShortScore`).text(outcomeVal);
    userScoreElem.innerHTML = diceGame.user_score;
    outcomeStringElem.innerHTML = outcomeString;
    changePhase();
}

function compTurn(){
    whoTurnElem.innerHTML = "Computer's Turn";
    compDice1 = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    compDice2 = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);

    outcomeString = ``;
    outcomeVal = 0;

    $(`#firstCompDice`).attr("src", `images/dice-images/dice-six-faces-${compDice1}.png`);
    $(`#secondCompDice`).attr("src", `images/dice-images/dice-six-faces-${compDice2}.png`);

    if (compDice1 == 1 || compDice2 == 1) {
        outcomeString = `The Computer rolled a 1. They get nothing...`;
    } else if (compDice1 == compDice2){
        outcomeString = `Both dice rolled ${compDice1}! Double Multiplier!`;
        outcomeVal = (compDice1 + compDice2) * 2;
    } else {
        outcomeString = `The Computer rolled a ${compDice1} and a ${compDice2}. Total is ${compDice1 + compDice2}`;
        outcomeVal = (compDice1 + compDice2);
    }
    diceGame.comp_score += outcomeVal;
    $(`#compShortScore`).text(outcomeVal);
    compScoreElem.innerHTML = diceGame.comp_score;
    outcomeStringElem.innerHTML = outcomeString;
}

function changePhase(){
    outcomeStringElem.innerHTML += `<br><p>Computer is rolling...</p>`
    setTimeout(() => {
        compTurn();
    }, 2000);
    setTimeout(() => {
        changeTurn();
    }, 5500);
}
 
function changeTurn(){
    if (diceGame.turn_number < 3){
        diceGame.turn_number += 1;
    } else {
        endGame();
        return;
    }
    userScoreElem.innerHTML = diceGame.user_score;
    compScoreElem.innerHTML = diceGame.comp_score;
    turnNumElem.innerHTML = diceGame.turn_number;
    whoTurnElem.innerHTML = "User's Turn";
    outcomeStringElem.innerHTML += `<br><p>...Waiting For User...</p>`
    diceGame.player_turn = true;
}

// const firstUserDiceElem = document.getElementById(`firstUserDice`).innerHTML;
// const secondUserDiceElem = document.getElementById(`secondUserDice`).innerHTML;
// const firstCompDiceElem = document.getElementById(`firstCompDice`).innerHTML;
// const secondCompDiceElem = document.getElementById(`secondCompDice`).innerHTML;

$(`#firstUserDice`).attr("src", ``);
$(`#secondUserDice`).attr("src", ``);
$(`#firstCompDice`).attr("src", ``);
$(`#secondCompDice`).attr("src", ``);

function diceImages(firstNum, secondNum){
    return `images\dice-images\dice-six-faces-${firstNum}.png`;
}


function endGame(){
    if (diceGame.user_score > diceGame.comp_score){
        outcomeStringElem.innerHTML =`User Wins!!!`;   
    } else if (diceGame.comp_score > diceGame.user_score){
        outcomeStringElem.innerHTML =`Comp Wins!!!`;
    } else if (diceGame.user_score == diceGame.comp_score){
        outcomeStringElem.innerHTML =`Game is Tied!!!`;
    } else {
        outcomeStringElem.innerHTML =`Undefined Game Result`;
    }
}

function resetGame(){
    diceGame.user_score = 0;
    diceGame.comp_score = 0;
    diceGame.turn_number = 1;
    diceGame.player_turn = true;
    whoTurnElem.innerHTML = "User's Turn";
    outcomeStringElem.innerHTML = `Let's Play A Game!`;
    $(`#firstUserDice`).attr("src", `images/dice-images/dice-six-faces-1.png`);
    $(`#secondUserDice`).attr("src", `images/dice-images/dice-six-faces-6.png`);   
    $(`#firstCompDice`).attr("src", `images/dice-images/dice-six-faces-1.png`);
    $(`#secondCompDice`).attr("src", `images/dice-images/dice-six-faces-6.png`);

    userScoreElem.innerHTML = diceGame.user_score;
    compScoreElem.innerHTML = diceGame.comp_score;
    turnNumElem.innerHTML = diceGame.turn_number;
}

