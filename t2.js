let startTime;
let updatedTime;
let difference;
let timerID;
let running = false;
let laps = [];

const timeDisplay = document.getElementById('timeDisplay');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('lapsContainer');

function startStopwatch() {
    startTime = new Date().getTime();
    timerID = setInterval(updateTime, 1);
    startStopBtn.textContent = 'Pause';
    running = true;
}

function stopStopwatch() {
    clearInterval(timerID);
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    startStopBtn.textContent = 'Start';
    running = false;
}

function resetStopwatch() {
    clearInterval(timerID);
    timeDisplay.textContent = '00:00:00.000';
    startStopBtn.textContent = 'Start';
    running = false;
    laps = [];
    renderLaps();
}

function updateTime() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime + (difference || 0);

    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000));

    timeDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(number, length = 2) {
    return number.toString().padStart(length, '0');
}

function recordLap() {
    if (running) {
        const lapTime = timeDisplay.textContent;
        laps.push(lapTime);
        renderLaps();
    }
}

function renderLaps() {
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${index + 1}: ${lap}`;
        lapsContainer.appendChild(lapElement);
    });
}

startStopBtn.addEventListener('click', () => {
    if (running) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
