//'use strict';
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player = document.querySelectorAll('.player'); //array
let diceRandom;

let currentScore,
  totalScore0,
  totalScore1,
  firstPlayer,
  currentPlayer,
  nextPlayer,
  playing; // check current user playing
const init = function () {
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  diceElement.classList.add('hidden');
  player[0].classList.remove('player--winner');
  player[1].classList.remove('player--winner');

  currentScore = 0;
  totalScore0 = 0;
  totalScore1 = 0;
  firstPlayer = true;
  playing = true;
};
init();
const checkPlayer = function () {
  currentPlayer = firstPlayer ? 0 : 1;
  nextPlayer = firstPlayer ? 1 : 0;
};
const switchPlayer = function () {
  player[currentPlayer].classList.remove('player--active'); //0
  player[nextPlayer].classList.add('player--active'); //1
  firstPlayer = !firstPlayer; //false
  currentScore = 0; //set current score of player = 0
  document.querySelector(`#current--${currentPlayer}`).textContent =
    currentScore;
};

const calcCurrentScore = function () {
  checkPlayer();
  if (diceRandom !== 1) {
    currentScore = currentScore + diceRandom;
    document.querySelector(`#current--${currentPlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
  //return currentScore;
};

const calcTotalScore = function () {
  checkPlayer();
  if (firstPlayer) {
    totalScore0 = totalScore0 + currentScore;
    document.querySelector(`#score--${currentPlayer}`).textContent =
      totalScore0;
  } else {
    totalScore1 = totalScore1 + currentScore;
    document.querySelector(`#score--${currentPlayer}`).textContent =
      totalScore1;
  }

  if (totalScore0 >= 40 || totalScore1 >= 40) {
    player[currentPlayer].classList.remove('player--active');
    player[currentPlayer].classList.add('player--winner');
    diceElement.classList.add('hidden');
    playing = false;
  }
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    diceRandom = Math.trunc(Math.random() * 6) + 1;
    const srcDice = `dice-${diceRandom}.png`;
    diceElement.setAttribute('src', srcDice);
    diceElement.classList.remove('hidden');
    calcCurrentScore();
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    calcTotalScore();
    switchPlayer();
  }
});
btnNew.addEventListener('click', function () {
  init();
});
