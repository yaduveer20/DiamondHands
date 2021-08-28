'use strict';

let secretNumber = generateRandom();
let highscore = 0;
let score = 20;

const scoreElement = document.querySelector('.output-score');
const highscoreElement = document.querySelector('.output-highscore');
const secretNumberElement = document.querySelector('.secret-number');
const messageElement = document.querySelector('.message');
const bodyTag = document.querySelector('body');
const inputNumberElement = document.querySelector('.input-number');


//generate random number between 1 to 20;
function generateRandom(){
    return Math.floor(Math.random()*20) + 1;
} 

//update score
function updateScore(){
    scoreElement.textContent = score;
}

//update highscore
function updateHighscore(){
    highscoreElement.textContent = highscore;
}

//update secret number
function updateSecretNumber(value){
    secretNumberElement.textContent = value ? secretNumber : '?';
}


//updates message
const updateMessage = function(message){
    messageElement.textContent = message;
}

//update background color of webpage

function updateBackgroundColor(color){
    bodyTag.style.backgroundColor = color;
}

//handles click events of check button
document.querySelector('.check').addEventListener('click',function(){
    const guessedNumber = Number(inputNumberElement.value);
    
    //no input entered
    if(!guessedNumber){
        updateMessage('⛔️ No guess made!');

    }
    else{
        console.log(guessedNumber);
        console.log('secret',secretNumber);

        //winning condition
        if(guessedNumber === secretNumber){
            updateBackgroundColor('#60b347');
            updateMessage('🎉 Correct answer!');
            updateSecretNumber(true);
            if(score > highscore){
                highscore = score;
                updateHighscore();
            }
        }
        else{
            //if the guess in incorrect

            updateBackgroundColor('#ff0000');

            score--;
            if(score > 0){
                updateMessage(guessedNumber > secretNumber ? '📈 Too high!' : '📉Too low!');
            }
            else updateMessage('💥 You lost!');
            updateScore();
        }
        inputNumberElement.value = null;
    }
});

//handles events of play again button
document.querySelector('.play-again').addEventListener('click',function(){
    updateBackgroundColor('#222');
    score = 20;
    secretNumber = generateRandom();
    updateMessage('Make your first guess!');
    updateScore();
    updateSecretNumber(false);
});