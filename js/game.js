const levelsScreen = document.getElementById('levels-screen');
const gameScreen   = document.getElementById('game-screen');
const backBtn      = document.getElementById('back-btn');
const levelTitle   = document.getElementById('level-title');
const questionEl   = document.getElementById('question');
const optionsEl    = document.getElementById('options');
const nextBtn      = document.getElementById('next-btn');

let correctAnswer = 0;

// Level card clicks
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const level = parseInt(card.dataset.level);
    if (level === 1) {
      openGame(level);
    }
  });
});

backBtn.addEventListener('click', () => {
  gameScreen.classList.add('hidden');
  levelsScreen.classList.remove('hidden');
});

nextBtn.addEventListener('click', () => {
  nextBtn.classList.add('hidden');
  generateQuestion();
});

function openGame(level) {
  levelTitle.textContent = `Level ${level}`;
  levelsScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  nextBtn.classList.add('hidden');
  generateQuestion();
}

function generateQuestion() {
  const a = randInt(1, 10);
  const b = randInt(1, 10);
  correctAnswer = a + b;
  questionEl.textContent = `${a} + ${b} = ?`;

  const options = buildOptions(correctAnswer);
  optionsEl.innerHTML = '';
  options.forEach(value => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = value;
    btn.addEventListener('click', () => checkAnswer(btn, value));
    optionsEl.appendChild(btn);
  });
}

function buildOptions(correct) {
  const set = new Set([correct]);
  while (set.size < 3) {
    const offset = randInt(1, 5) * (Math.random() < 0.5 ? 1 : -1);
    const wrong = correct + offset;
    if (wrong > 0) set.add(wrong);
  }
  return shuffle([...set]);
}

function checkAnswer(btn, value) {
  optionsEl.querySelectorAll('.option-btn').forEach(b => {
    b.disabled = true;
    if (parseInt(b.textContent) === correctAnswer) b.classList.add('correct');
  });
  if (value !== correctAnswer) btn.classList.add('wrong');
  nextBtn.classList.remove('hidden');
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
