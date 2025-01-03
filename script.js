// Get DOM elements
const currentDayElement = document.getElementById('currentDay');
const currentRepsElement = document.getElementById('currentReps');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const markDayButton = document.getElementById('markDayButton');
const resetButton = document.getElementById('resetButton');
const goBackButton = document.getElementById('goBackButton');
const achievementBadge = document.getElementById('achievementBadge');

// Total number of days in the challenge
const totalDays = 366;

// Initialize values from localStorage or default
let currentDay = parseInt(localStorage.getItem('currentDay')) || 1;
let currentReps = parseInt(localStorage.getItem('currentReps')) || 1;

// Update the UI with saved values
function updateUI() {
    currentDayElement.textContent = currentDay;
    currentRepsElement.textContent = currentReps;
}

// Update progress bar and badge
function updateProgress() {
    const progress = (currentDay / totalDays) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;

    // Show/hide achievement badge
    if (currentDay === totalDays) {
        achievementBadge.classList.remove('hidden');
    } else {
        achievementBadge.classList.add('hidden');
    }

    // Save progress to localStorage
    localStorage.setItem('currentDay', currentDay);
    localStorage.setItem('currentReps', currentReps);
}

// Mark day button handler
markDayButton.addEventListener('click', () => {
    if (currentDay < totalDays) {
        currentDay++;
        currentReps = currentDay;
        updateUI();
        updateProgress();
    }
});

// Go back a day button handler
goBackButton.addEventListener('click', () => {
    if (currentDay > 1) {
        currentDay--;
        currentReps = currentDay;
        updateUI();
        updateProgress();
    }
});

// Reset button handler
resetButton.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas reiniciar tu progreso?')) {
        currentDay = 1;
        currentReps = 1;
        updateUI();
        updateProgress();
    }
});

// Initialize the UI and progress bar
updateUI();
updateProgress();
