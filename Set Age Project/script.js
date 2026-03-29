// --- 1. DOM Element Selection ---
const nameInput = document.getElementById('user-name');
const dobInput = document.getElementById('dob');
const generateBtn = document.getElementById('generate-btn');
const errorMsg = document.getElementById('error-msg');
const dashboard = document.getElementById('dashboard');
const themeToggle = document.getElementById('theme-toggle');

let liveTimer; // Holds the setInterval ID

// Prevent future date selection in the UI
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
dobInput.max = now.toISOString().slice(0, 16);

// --- 2. Theme Toggling ---
themeToggle.addEventListener('click', () => {
    const root = document.documentElement;
    const icon = themeToggle.querySelector('i');
    
    if (root.getAttribute('data-theme') === 'dark') {
        root.removeAttribute('data-theme');
        icon.className = 'fa-solid fa-moon';
    } else {
        root.setAttribute('data-theme', 'dark');
        icon.className = 'fa-solid fa-sun';
    }
});

// --- 3. Main Event Listener & Validation ---
generateBtn.addEventListener('click', () => {
    const nameValue = nameInput.value.trim();
    const dobValue = dobInput.value;
    
    // Validation
    if (!nameValue) {
        showError("Please enter your Name.");
        return;
    }
    if (!dobValue) {
        showError("Please select your Date and Time of Birth.");
        return;
    }
    
    const dob = new Date(dobValue);
    if (dob > new Date()) {
        showError("Birth date cannot be in the future.");
        return;
    }

    // Success state: Clear errors, set greeting, show dashboard
    errorMsg.textContent = "";
    document.getElementById('greeting-text').textContent = `Hello, ${nameValue}!`;
    dashboard.classList.remove('hidden');

    // Run calculations immediately, then start a 1-second interval loop
    runAllCalculations(dob);
    if (liveTimer) clearInterval(liveTimer);
    liveTimer = setInterval(() => runAllCalculations(dob), 1000);
});

// Helper to show errors and hide dashboard if data is invalid
function showError(msg) {
    errorMsg.textContent = msg;
    dashboard.classList.add('hidden');
    if (liveTimer) clearInterval(liveTimer);
}

// Master function that triggers all modules
function runAllCalculations(dob) {
    const today = new Date();
    
    calculateExactAge(dob, today);
    calculateNextBirthday(dob, today);
    calculateLifeStats(dob, today);
    calculateLifeProgress(dob, today);
    
    // JS getMonth() is 0-indexed (Jan=0), so we add 1 for the zodiac function
    const zodiacResult = getZodiacSign(dob.getDate(), dob.getMonth() + 1);
    document.getElementById('zodiac-result').textContent = zodiacResult;
}

// --- 4. Modular Calculation Functions ---

function calculateExactAge(dob, today) {
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    // Adjust negative days (borrowing from previous month)
    if (days < 0) {
        months--;
        const prevMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        days += prevMonthDays;
    }
    // Adjust negative months (borrowing from previous year)
    if (months < 0) {
        years--;
        months += 12;
    }

    // Time calculations
    let hours = today.getHours() - dob.getHours();
    let mins = today.getMinutes() - dob.getMinutes();
    let secs = today.getSeconds() - dob.getSeconds();

    if (secs < 0) { mins--; secs += 60; }
    if (mins < 0) { hours--; mins += 60; }
    if (hours < 0) { hours += 24; days--; }

    // Utility to pad single digits with a zero (e.g., '9' becomes '09')
    const pad = (num) => num.toString().padStart(2, '0');

    document.getElementById('exact-ymd').textContent = `${years} Yrs • ${months} Mos • ${days} Days`;
    document.getElementById('exact-hms').textContent = `${pad(hours)} : ${pad(mins)} : ${pad(secs)}`;
}

function calculateNextBirthday(dob, today) {
    // Construct birthday for the current year
    let nextBday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate(), dob.getHours(), dob.getMinutes());
    
    // If it has already passed this year, increment to next year
    if (today > nextBday) {
        nextBday.setFullYear(today.getFullYear() + 1);
    }
    
    const diffMs = nextBday - today;
    
    document.getElementById('bd-days').textContent = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    document.getElementById('bd-hours').textContent = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    document.getElementById('bd-mins').textContent = Math.floor((diffMs / 1000 / 60) % 60);
    document.getElementById('bd-secs').textContent = Math.floor((diffMs / 1000) % 60);
}

function calculateLifeStats(dob, today) {
    const diffMs = today - dob;
    
    const totDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totWeeks = Math.floor(totDays / 7);
    const totMonths = (today.getFullYear() - dob.getFullYear()) * 12 + (today.getMonth() - dob.getMonth());
    const totHours = Math.floor(diffMs / (1000 * 60 * 60));

    // .toLocaleString() automatically adds commas to large numbers
    document.getElementById('tot-months').textContent = totMonths.toLocaleString();
    document.getElementById('tot-weeks').textContent = totWeeks.toLocaleString();
    document.getElementById('tot-days').textContent = totDays.toLocaleString();
    document.getElementById('tot-hours').textContent = totHours.toLocaleString();
}

function calculateLifeProgress(dob, today) {
    const ageMs = today - dob;
    const eightyYearsMs = 80 * 365.25 * 24 * 60 * 60 * 1000; // Assuming 80 years
    
    let percentage = (ageMs / eightyYearsMs) * 100;
    if (percentage > 100) percentage = 100;

    const displayPercent = percentage.toFixed(4); // 4 decimals shows live movement
    
    document.getElementById('life-percent').textContent = displayPercent;
    document.getElementById('life-progress').style.width = `${displayPercent}%`;
}

// --- 5. EXACT User Provided Zodiac Function ---
function getZodiacSign(day, month){
    if((month == 3 && day >= 21) || (month == 4 && day <= 19))
        return "Aries ♈";
    else if((month == 4 && day >= 20) || (month == 5 && day <= 20))
        return "Taurus ♉";
    else if((month == 5 && day >= 21) || (month == 6 && day <= 20))
        return "Gemini ♊";
    else if((month == 6 && day >= 21) || (month == 7 && day <= 22))
        return "Cancer ♋";
    else if((month == 7 && day >= 23) || (month == 8 && day <= 22))
        return "Leo ♌";
    else if((month == 8 && day >= 23) || (month == 9 && day <= 22))
        return "Virgo ♍";
    else if((month == 9 && day >= 23) || (month == 10 && day <= 22))
        return "Libra ♎";
    else if((month == 10 && day >= 23) || (month == 11 && day <= 21))
        return "Scorpio ♏";
    else if((month == 11 && day >= 22) || (month == 12 && day <= 21))
        return "Sagittarius ♐";
    else if((month == 12 && day >= 22) || (month == 1 && day <= 19))
        return "Capricorn ♑";
    else if((month == 1 && day >= 20) || (month == 2 && day <= 18))
        return "Aquarius ♒";
    else
        return "Pisces ♓";
}