let minutes = 0;
let seconds = 0;
let centiseconds = 0;
let timerInterval = null;
let running = false;
let lapNb = 0;
let totalTime = 0;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const centisecondsDisplay = document.getElementById("centiseconds");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const lapBtn = document.getElementById("lap-btn");
const resetBtn = document.getElementById("reset-btn");
const lapCtnr = document.getElementById("lap-times-container");

function formatTime(unit) {
    return unit < 10 ? `0${unit}` : unit;
}

function updateDisplay() {
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    centisecondsDisplay.textContent = formatTime(centiseconds);
}

function startTimer() {
    if (!running) {
        running = true;
        timerInterval = setInterval(() => {
            centiseconds++;
            totalTime++;
            if (centiseconds === 100) {
                centiseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            updateDisplay();
        }, 10);

        startBtn.style.display = 'none';
        resetBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        lapBtn.style.display = 'inline-block';
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    running = false;

    startBtn.style.display = 'inline-block';
    resetBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    lapBtn.style.display = 'none';
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    minutes = 0;
    seconds = 0;
    centiseconds = 0;
    totalTime = 0;
    lapNb = 0;
    lapCtnr.innerHTML = '';
    updateDisplay();

    startBtn.style.display = 'inline-block';
    resetBtn.style.display = 'none';
    pauseBtn.style.display = 'none';
    lapBtn.style.display = 'none';
}

function recordLap() {
    lapNb++;

    let currentLapTime = totalTime;

    const lapEntry = document.createElement('div');
    lapEntry.classList.add('lap-entry');

    const lapNumber = document.createElement('span');
    lapNumber.textContent = `Lap ${lapNb}`;

    const lapTime = document.createElement('span');
    let lapMinutes = Math.floor(currentLapTime / 6000);
    let lapSeconds = Math.floor((currentLapTime % 6000) / 100);
    let lapCentiseconds = currentLapTime % 100;
    lapTime.textContent = `${formatTime(lapMinutes)}:${formatTime(lapSeconds)}.${formatTime(lapCentiseconds)}`;

    lapEntry.appendChild(lapNumber);
    lapEntry.appendChild(lapTime);

    lapCtnr.appendChild(lapEntry);
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);

updateDisplay();
