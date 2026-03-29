// --- Configuration & State ---
const API = 'https://disease.sh/v3/covid-19';
let globalData = null;
let countryDataList = [];
let chartInstance = null;
let currentChartType = 'bar';
let syncInterval;

// --- DOM References ---
const els = {
    cases: document.getElementById('g-cases'),
    deaths: document.getElementById('g-deaths'),
    recovered: document.getElementById('g-recovered'),
    active: document.getElementById('g-active'),
    updated: document.getElementById('lastUpdated'),
    error: document.getElementById('errorPanel'),
    continentFilter: document.getElementById('continentFilter'),
    searchInp: document.getElementById('countrySearch'),
    searchBtn: document.getElementById('searchBtn'),
    cResult: document.getElementById('countryResult'),
    rankBody: document.getElementById('rankingBody')
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    initParticles();
    initScrollAnimations();
    setupEvents();
    
    // Initial fetch
    fetchDashboardData();
    // 60-second auto-refresh
    syncInterval = setInterval(fetchDashboardData, 60000);
});

// --- API & Data Handling ---
async function fetchDashboardData() {
    try {
        els.error.classList.add('hidden');
        
        // Parallel fetching
        const [resGlobal, resCountries] = await Promise.all([
            fetch(`${API}/all`),
            fetch(`${API}/countries?sort=cases`)
        ]);

        if (!resGlobal.ok || !resCountries.ok) throw new Error("API Failure");

        globalData = await resGlobal.json();
        countryDataList = await resCountries.json();

        updateGlobalUI(globalData);
        updateTop10(countryDataList);
        renderChart();
        updateTime(globalData.updated);

    } catch (err) {
        console.error("Sync Error:", err);
        els.error.classList.remove('hidden');
    }
}

async function fetchByContinent(continent) {
    if (continent === 'all') return fetchDashboardData();
    try {
        const res = await fetch(`${API}/continents/${continent}?strict=true`);
        const data = await res.json();
        updateGlobalUI(data);
        updateTime(data.updated);
    } catch (err) {
        console.error(err);
    }
}

async function fetchCountry(country) {
    if (!country) return;
    try {
        const res = await fetch(`${API}/countries/${country}`);
        if (!res.ok) throw new Error("Not Found");
        const data = await res.json();
        showCountryResult(data);
    } catch (err) {
        alert("Region not found. Check spelling.");
    }
}

// --- UI Updates & Animations ---
function updateGlobalUI(data) {
    animateCounter(els.cases, data.cases, 1500);
    animateCounter(els.deaths, data.deaths, 1500);
    animateCounter(els.recovered, data.recovered, 1500);
    animateCounter(els.active, data.active, 1500);
}

function showCountryResult(data) {
    els.cResult.classList.remove('hidden');
    document.getElementById('c-name').textContent = data.country;
    document.getElementById('c-flag').src = data.countryInfo.flag;
    
    document.getElementById('c-cases').textContent = data.cases.toLocaleString();
    document.getElementById('c-deaths').textContent = data.deaths.toLocaleString();
    document.getElementById('c-recovered').textContent = data.recovered.toLocaleString();
    document.getElementById('c-active').textContent = data.active.toLocaleString();

    const closed = data.deaths + data.recovered;
    const recRate = closed ? ((data.recovered / closed) * 100).toFixed(1) : 0;
    const morRate = closed ? ((data.deaths / closed) * 100).toFixed(1) : 0;

    document.getElementById('c-rec-rate').textContent = `${recRate}%`;
    document.getElementById('c-mor-rate').textContent = `${morRate}%`;
}

function updateTop10(countries) {
    els.rankBody.innerHTML = '';
    countries.slice(0, 10).forEach((c, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${i + 1}</td>
            <td><img src="${c.countryInfo.flag}" width="24" style="border-radius:3px; margin-right:8px; vertical-align:middle;"> ${c.country}</td>
            <td class="text-warning">${c.cases.toLocaleString()}</td>
            <td class="text-info">+${c.todayCases.toLocaleString()}</td>
            <td class="text-danger">${c.deaths.toLocaleString()}</td>
        `;
        els.rankBody.appendChild(tr);
    });
}

function updateTime(timestamp) {
    const d = new Date(timestamp);
    els.updated.textContent = `Live: ${d.toLocaleTimeString()}`;
}

// Number Count-Up Logic
function animateCounter(el, target, duration) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const update = () => {
        start += increment;
        if (start < target) {
            el.textContent = Math.ceil(start).toLocaleString();
            requestAnimationFrame(update);
        } else {
            el.textContent = target.toLocaleString();
        }
    };
    update();
}

// --- Chart.js ---
function renderChart() {
    if (!globalData) return;
    const ctx = document.getElementById('healthChart').getContext('2d');
    
    if (chartInstance) chartInstance.destroy();

    const dataArr = [globalData.active, globalData.recovered, globalData.deaths];
    const colors = ['rgba(0, 212, 255, 0.7)', 'rgba(0, 255, 136, 0.7)', 'rgba(255, 42, 95, 0.7)'];
    const borders = ['#00d4ff', '#00ff88', '#ff2a5f'];

    chartInstance = new Chart(ctx, {
        type: currentChartType,
        data: {
            labels: ['Active', 'Recovered', 'Deaths'],
            datasets: [{
                label: 'Global Stats',
                data: dataArr,
                backgroundColor: colors,
                borderColor: borders,
                borderWidth: 2,
                hoverOffset: currentChartType === 'doughnut' ? 10 : 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: getComputedStyle(document.body).getPropertyValue('--text-main').trim() } }
            },
            scales: currentChartType === 'bar' ? {
                y: { ticks: { color: '#8b7fa3' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { ticks: { color: '#8b7fa3' }, grid: { display: false } }
            } : {}
        }
    });
}

// --- Event Listeners ---
function setupEvents() {
    // Search
    els.searchBtn.addEventListener('click', () => fetchCountry(els.searchInp.value));
    els.searchInp.addEventListener('keypress', e => { if (e.key === 'Enter') fetchCountry(els.searchInp.value); });

    // Continent Filter
    els.continentFilter.addEventListener('change', e => fetchByContinent(e.target.value));

    // Chart Toggles
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentChartType = e.target.dataset.type;
            renderChart();
        });
    });

    // Theme Toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
        const icon = document.querySelector('#themeToggle i');
        if (document.body.dataset.theme === 'light') {
            document.body.dataset.theme = 'dark';
            icon.className = 'fa-solid fa-moon';
        } else {
            document.body.dataset.theme = 'light';
            icon.className = 'fa-solid fa-sun';
        }
        if(chartInstance) renderChart(); // Update chart text colors
    });

    // Refresh & Retry
    document.getElementById('refreshBtn').addEventListener('click', (e) => {
        e.currentTarget.querySelector('i').style.transform = "rotate(360deg)";
        fetchDashboardData();
        setTimeout(() => e.currentTarget.querySelector('i').style.transform = "rotate(0deg)", 500);
    });
    document.getElementById('retryBtn').addEventListener('click', fetchDashboardData);

    // Scroll to Top
    const stBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) stBtn.classList.add('visible');
        else stBtn.classList.remove('visible');
    });
    stBtn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
}

// --- Visual Effects ---
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let width, height, particles;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.8 - 0.4;
            this.speedY = Math.random() * 0.8 - 0.4;
            this.color = `rgba(176, 38, 255, ${Math.random() * 0.4 + 0.1})`;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    particles = Array.from({ length: 60 }, () => new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}