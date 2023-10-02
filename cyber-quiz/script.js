const startBtn = document.querySelector('.start-btn');
const quizContainer = document.querySelector('.quiz');
const quizBox = document.querySelector('.quiz-box');
const scoreEl = document.querySelector('.score');
const questionEl = document.querySelector('.question-text');
const optionsEl = document.querySelector('.question-options').children;
const countEl = document.querySelector('.question-count');
const nextBtn = document.querySelector('.btn-next');
const quizEnd = document.querySelector('.quiz-end');
const btnPlayAgain = document.querySelector('.play-again');

for (let i = 0; i < optionsEl.length; i++) {
  optionsEl[i].addEventListener('click', checkAnswer);
};
nextBtn.addEventListener('click', nextQuestion);
btnPlayAgain.addEventListener('click', playAgain);

let score = 0;
let questionCount = 0;

function shuffleArray(array) {
  let shuffledArray = [];
  let usedIndexes = [];

  let i = 0;
  while (i < array.length) {
    const randomNumber = Math.floor(Math.random() * array.length)
    if (!usedIndexes.includes(randomNumber)) {
      shuffledArray.push(array[randomNumber]);
      usedIndexes.push(randomNumber);
      i++;
    };
  }

  return shuffledArray;
}
let questionsArray = shuffleArray(questions);

function startQuiz() {
  quizContainer.style.width = '100vw';
  quizBox.style.opacity = '1';
  quizBox.style.pointerEvents = 'all';
  showQuestion(questionCount);
}
startBtn.addEventListener('click', startQuiz);

function showQuestion(index) {
  const question = questionsArray[index];

  questionEl.textContent = `${questionCount + 1}. ${question.question}`;
  for (let i = 0; i < optionsEl.length; i++) {
    optionsEl[i].textContent = question.options[i];
  };
  countEl.textContent = `${questionCount + 1} of 9 Questions`;
}

function checkAnswer(el) {
  const userAnswer = el.target.textContent;
  const correctAnswer = questionsArray[questionCount].answer;
  if (userAnswer === correctAnswer) {
    el.target.classList.add('correct');
    score++;
    scoreEl.textContent = `Score: ${score} / 9`;
  }
  else {
    let index;
    el.target.classList.add('incorrect');
    for (let i = 0; i < optionsEl.length; i++) {
      if (optionsEl[i].textContent === correctAnswer) index = i;
    };
    optionsEl[index].classList.add('correct')
  }

  questionCount++;
  for (let i = 0; i < optionsEl.length; i++) {
    optionsEl[i].style.pointerEvents = 'none';
  };
  nextBtn.classList.add('active');
}

function nextQuestion() {
  if (questionCount === 9) endGame();
  else {
    nextBtn.classList.remove('active');
    for (let i = 0; i < optionsEl.length; i++) {
      if (optionsEl[i].classList.contains('correct')) optionsEl[i].classList.remove('correct');
      if (optionsEl[i].classList.contains('incorrect')) optionsEl[i].classList.remove('incorrect');
      optionsEl[i].style.pointerEvents = 'all';
    };
    showQuestion(questionCount);
  };
}

function endGame() {
  quizBox.style.transitionDelay = '0s';
  quizBox.style.opacity = '0';
  quizBox.style.pointerEvents = 'none';

  document.querySelector('.quiz-end h1').textContent = `You scored ${score} / 9!`;
  setTimeout(() => {
    quizEnd.style.opacity = 1;
    quizEnd.style.pointerEvents = 'all';
  }, 300);
}

function playAgain() {
  quizEnd.style.opacity = 0;
  quizEnd.style.pointerEvents = 'none';

  quizBox.style.transitionDelay = '0.3s';
  quizBox.style.opacity = '1';
  quizBox.style.pointerEvents = 'all';
  questionCount = 0;
  score = 0;
  scoreEl.textContent = `Score: ${score} / 9`;
  questionsArray = shuffleArray(questions);
  nextQuestion();
}