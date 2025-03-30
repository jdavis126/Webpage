const squares = document.querySelectorAll('.square');
const difficultyButton = document.getElementById('difficulty-button');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');

let timerId;
let difficulty = 'simple'; 
let moleTimer = 1000;
let score = 0;
let timeLeft = 60;
let countdownTimer;

function randomSquare() {
  squares.forEach(square => square.classList.remove('mole'));
  const randomIndex = Math.floor(Math.random() * 9);
  squares[randomIndex].classList.add('mole');
}

function startGame() {
  clearInterval(timerId); 
  timerId = setInterval(randomSquare, moleTimer);
}


function endGame() {
  clearInterval(timerId); 
  clearInterval(countdownTimer); 
  squares.forEach(square => square.classList.remove('mole')); 
  alert(`Game Over! Your total score is ${score}`); 
}

function startCountdown() {
  countdownTimer = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;
    if (timeLeft === 0) {
      endGame();
    }
  }, 1000);
}


difficultyButton.addEventListener('click', () => {
    if (difficulty === 'simple') {
      difficulty = 'hard';
      difficultyButton.textContent = 'Hard';
      moleTimer = 500;
    } else {
      difficulty = 'simple';
      difficultyButton.textContent = 'Simple';
      moleTimer = 1000;
    }
  
    resetGameState();
    startGame(); 
  });
  
  function resetGameState() {
    clearInterval(countdownTimer);
    timeLeft = 60;
    timeLeftDisplay.textContent = timeLeft;
    startCountdown(); 
  
    score = 0;
    scoreDisplay.textContent = score;
  }
squares.forEach(square => {
  square.addEventListener('click', () => {
    if (square.classList.contains('mole')) {
      score++; 
      scoreDisplay.textContent = score;
      square.classList.remove('mole');
    }
  });
});

startGame();
startCountdown();
