// Get DOM elements
const currentDayElement = document.getElementById('currentDay');
const currentRepsElement = document.getElementById('currentReps');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const markDayButton = document.getElementById('markDayButton');
const resetButton = document.getElementById('resetButton');
const goBackButton = document.getElementById('goBackButton');
const achievementBadge = document.getElementById('achievementBadge');
const reminderTimeInput = document.getElementById('reminderTime');
const setReminderButton = document.getElementById('setReminderButton');

let reminderInterval;

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

    if (currentDay === totalDays) {
        achievementBadge.classList.remove('hidden');
    } else {
        achievementBadge.classList.add('hidden');
    }

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

// Request notification permission
function requestNotificationPermission() {
    if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                alert('Notificaciones habilitadas.');
            } else {
                alert('Por favor, habilita las notificaciones en tu navegador.');
            }
        });
    }
}

// Function to show the notification
function showNotification() {
    if (Notification.permission === 'granted') {
        new Notification('¡Hora de hacer flexiones!', {
            body: 'Recuerda completar tus repeticiones del día para mantener el progreso.',
            icon: './logo.webp'
        });
    }
}

// Set reminder for daily notifications
function setDailyReminder(hour, minute) {
    if (reminderInterval) {
        clearInterval(reminderInterval);
    }

    reminderInterval = setInterval(() => {
        const now = new Date();
        console.log(`Checking: Now ${now.getHours()}:${now.getMinutes()}, Reminder ${hour}:${minute}`);
        if (now.getHours() === hour && now.getMinutes() === minute) {
            showNotification();
        }
    }, 60000); // Check every minute
}

// Set reminder handler
setReminderButton.addEventListener('click', () => {
    const reminderTime = reminderTimeInput.value;
    if (!reminderTime) {
        alert('Por favor, define una hora válida.');
        return;
    }

    const [hours, minutes] = reminderTime.split(':').map(Number);
    alert(`Recordatorio configurado para las ${reminderTime} todos los días.`);

    localStorage.setItem('reminderTime', reminderTime);

    setDailyReminder(hours, minutes);
});

// Initialize the UI and progress bar
updateUI();
updateProgress();

// Initialize reminder on page load
document.addEventListener('DOMContentLoaded', () => {
    requestNotificationPermission();

    const savedReminderTime = localStorage.getItem('reminderTime');
    if (savedReminderTime) {
        reminderTimeInput.value = savedReminderTime;
        const [hours, minutes] = savedReminderTime.split(':').map(Number);
        setDailyReminder(hours, minutes);
    }
});
