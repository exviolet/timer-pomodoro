let timerInterval;
let timeLeft = 25 * 60; 
let isRunning = false;
let isWorking = true;

document.addEventListener('DOMContentLoaded', () => {

    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const workTimeInput = document.getElementById('work-time');
    const breakTimeInput = document.getElementById('break-time');
    
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
    }

    function startTimer() {
        if(!isRunning) {
            isRunning = true;
            timerInterval = setInterval(() => {
                timeLeft--;
                updateTimerDisplay();
                if (timeLeft <= 0 ) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    alert(isWorkTime ? 'Время работы закончено! Сделайте перерыв.' : 'Перерыв закончен! Время работать.');
                    isWorkTime = !isWorkTime; 
                    timeLeft = (isWorkTime ? workTimeInput.value : breakTimeInput.value) * 60;
                    updateTimerDisplay();
                }
            }, 1000);
        } 
    }

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isWorkTime = true;
    timeLeft = workTimeInput.value * 60;
    updateTimerDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

workTimeInput.addEventListener('change', () => {
    if (!isRunning && isWorkTime) {
        timeLeft = workTimeInput.value * 60;
        updateTimerDisplay();
    } 
});

breakTimeInput.addEventListener('change', () => {
    if (!isRunning && !isWorkTime) {
        timeLeft = breakTimeInput.value * 60;
        updateTimerDisplay();
    } 
});
});