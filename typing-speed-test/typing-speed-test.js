const startBtn = document.getElementById('start-btn');
const inputText = document.getElementById('input-text');
const timerDisplay = document.getElementById('timer');
const wpmResult = document.getElementById('wpm-result');
const sampleTextElem = document.getElementById('sample-text');

const sampleSentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect.",
  "Typing speed improves with time.",
  "JavaScript is fun to learn.",
  "Stay focused and keep typing."
];

let currentIndex = 0;
let startTime;
let intervalId;
const testDuration = 60; // seconds
let testActive = false;

function setSampleSentence() {
  const sentence = sampleSentences[currentIndex];
  sampleTextElem.innerHTML = '';
  for (let char of sentence) {
    const span = document.createElement('span');
    span.textContent = char;
    sampleTextElem.appendChild(span);
  }
}

function calculateWPM(text, timeInSeconds) {
  const wordsTyped = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = timeInSeconds / 60;
  return minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
}

function startTest() {
  inputText.value = '';
  inputText.disabled = false;
  inputText.focus();
  wpmResult.textContent = '';
  timerDisplay.textContent = `Time: ${testDuration}s`;
  testActive = true;

  startTime = Date.now();

  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const timeLeft = testDuration - elapsedSeconds;
    if (timeLeft >= 0) {
      timerDisplay.textContent = `Time: ${timeLeft}s`;
    } else {
      endTest();
    }
  }, 300);

  setSampleSentence();
  updateHighlight();
}

function endTest() {
  clearInterval(intervalId);
  inputText.disabled = true;
  testActive = false;

  const timeElapsed = (Date.now() - startTime) / 1000;
  const typedText = inputText.value;

  const wpm = calculateWPM(typedText, timeElapsed);
  wpmResult.textContent = `Your typing speed: ${wpm} WPM`;

  currentIndex = 0;
  sampleTextElem.textContent = "Test ended. Click Start to try again.";
}

function checkCompletionAndHighlight() {
  const sentence = sampleSentences[currentIndex];
  const userInput = inputText.value;

  const sentenceSpans = sampleTextElem.querySelectorAll('span');
  for (let i = 0; i < sentenceSpans.length; i++) {
    const char = userInput[i];
    if (char == null) {
      sentenceSpans[i].className = '';
    } else if (char === sentenceSpans[i].textContent) {
      sentenceSpans[i].className = 'correct';
    } else {
      sentenceSpans[i].className = 'incorrect';
    }
  }

  if (userInput.trim() === sentence) {
    return true;
  }

  return false;
}

startBtn.addEventListener('click', () => {
  startTest();
});

inputText.addEventListener('input', () => {
  if (!testActive) return;

  const complete = checkCompletionAndHighlight();

  if (complete) {
    currentIndex = (currentIndex + 1) % sampleSentences.length;
    setSampleSentence();
    inputText.value = '';
    updateHighlight();
  }
});

function updateHighlight() {
  const sentenceSpans = sampleTextElem.querySelectorAll('span');
  const userInput = inputText.value;

  for (let i = 0; i < sentenceSpans.length; i++) {
    const char = userInput[i];
    if (char == null) {
      sentenceSpans[i].className = '';
    } else if (char === sentenceSpans[i].textContent) {
      sentenceSpans[i].className = 'correct';
    } else {
      sentenceSpans[i].className = 'incorrect';
    }
  }
}
