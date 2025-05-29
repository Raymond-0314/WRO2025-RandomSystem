let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const toggleButton = document.getElementById("toggle-timer");
const resetButton = document.getElementById("reset-timer");
const mainTimeSpan = document.getElementById("main-time");
const msTimeSpan = document.getElementById("ms-time");

function updateDisplay() {
  const time = elapsedTime + (isRunning ? Date.now() - startTime : 0);
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  mainTimeSpan.textContent =
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}`;

  msTimeSpan.textContent = `.${String(milliseconds).padStart(3, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 50);
    isRunning = true;
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  updateDisplay();
}

// 事件監聽

//resetBtn.addEventListener("click", resetTimer);

toggleButton.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 50);
    toggleButton.textContent = "暫停";
    toggleButton.style = "background: red;";
    isRunning = true;
  } else {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    toggleButton.textContent = "開始";
    toggleButton.style = "background: green;";
    isRunning = false;
  }
});

resetButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  updateDisplay();
  toggleButton.textContent = "開始";
});

function updateDisplay() {
  const time = elapsedTime + (isRunning ? Date.now() - startTime : 0);
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  mainTimeSpan.textContent =
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}`;
  msTimeSpan.textContent = `.${String(milliseconds).padStart(3, '0')}`;
}



// 初始化顯示
updateDisplay();
