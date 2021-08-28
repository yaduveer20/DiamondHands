'use strict';

let totalScorePlayer1 = 0;
let totalScorePlayer2 = 0;
let currentScore = 0;
let toggle = true;

let elemCurrentScore = null;
let elemTotalScore = null;
let currentSection = null;
let otherSection = null;

const diceSource = ['dice1.png','dice2.png','dice3.png','dice4.png','dice5.png','dice6.png'];

//dice image element
const elemDice = document.querySelector('.dice');

//button elements 
const btnNewGame = document.querySelector('.new');
const btnRollDice = document.querySelector('.roll');
const btnHodl = document.querySelector('.hodl');

//current score elements
const elemCurrentScorePlayer1 = document.querySelector('#current-1');
const elemCurrentScorePlayer2 = document.querySelector('#current-2');

//total score elements
const elemTotalScorePlayer1 = document.querySelector('#score-1');
const elemTotalScorePlayer2 = document.querySelector('#score-2');

//player section elements
const secPlayer1 = document.querySelector('.player-1');
const secPlayer2 = document.querySelector('.player-2');


//update or reset current score element
function updateResetCurrentScore(elemCurrentScore){
    elemCurrentScore.textContent = currentScore;
}

//get current score element
function getCurrentScoreElement(){
    return toggle ? elemCurrentScorePlayer1 : elemCurrentScorePlayer2;
}

//get total score element
function getTotalScoreElement(){
    return toggle ? elemTotalScorePlayer1 : elemTotalScorePlayer2;
}

//toggle current active section

function toggleActive(){

    [currentSection,otherSection] = toggle ? [secPlayer1,secPlayer2] : [secPlayer2,secPlayer1];

    currentSection.classList.remove('player-active');
    otherSection.classList.add('player-active');
    
}


//roll dice button event click listener
btnRollDice.addEventListener('click',function(){
    //generates random dice roll
    const diceRoll = Math.floor(Math.random()*6)+1;

    elemDice.src = diceSource[diceRoll-1];

    elemDice.classList.remove('hidden');

    elemCurrentScore = getCurrentScoreElement();

    if(diceRoll === 1){
        currentScore = 0;

        toggleActive();

        toggle = !toggle;
        updateResetCurrentScore(elemCurrentScore);

        elemDice.classList.add('hidden');

    }
    else{
        currentScore += diceRoll;
        updateResetCurrentScore(elemCurrentScore);
    }
});


//hodl button event click listener
btnHodl.addEventListener('click',function(){
   elemCurrentScore = getCurrentScoreElement();
   elemTotalScore = getTotalScoreElement();

   elemTotalScore.textContent = (toggle ? totalScorePlayer1 : totalScorePlayer2) + currentScore;

   if(Number(elemTotalScore.textContent) >= 100){
       if(!otherSection) otherSection = secPlayer1;
       otherSection.classList.add('player-winner');
   }
   else{
    //update player total score
    if(toggle) totalScorePlayer1 += currentScore;
    else totalScorePlayer2 += currentScore;

    toggleActive();

    toggle = !toggle;
    currentScore = 0;

    updateResetCurrentScore(elemCurrentScore);
    elemDice.classList.add('hidden');
   }

});

//new game button event click listener
btnNewGame.addEventListener('click',function(){
    elemCurrentScore = getCurrentScoreElement();
    elemTotalScore = getTotalScoreElement();
    
    currentScore = 0;
    updateResetCurrentScore(elemCurrentScore);
    totalScorePlayer1 = totalScorePlayer2 = 0;
    elemTotalScore.textContent = 0;
    toggle = !toggle;
    elemTotalScore = getTotalScoreElement();
    elemTotalScore.textContent = 0;
    toggle = true;

    secPlayer1.classList.add('player-active');
    secPlayer2.classList.remove('player-active');
    
    elemDice.classList.add('hidden');

    if(otherSection) otherSection.classList.remove('player-winner');
});