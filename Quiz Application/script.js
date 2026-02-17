const questions = [
  { q: "What is JavaScript?", o: ["Language", "Database", "OS", "Browser"], a: 0 },
  { q: "JS file extension?", o: [".py", ".java", ".js", ".txt"], a: 2 },
  { q: "DOM stands for?", o: ["Data Object Model", "Document Object Model", "Desk Object Model", "None"], a: 1 },
  { q: "Which keyword declares variable?", o: ["int", "define", "var", "string"], a: 2 },
  { q: "Click event in JS?", o: ["onhover", "onclick", "onload", "onchange"], a: 1 },
  { q: "Console output method?", o: ["print", "echo", "console.log", "write"], a: 2 },
  { q: "JS runs in?", o: ["CPU", "RAM", "Browser", "GPU"], a: 2 },
  { q: "Loop in JS?", o: ["repeat", "cycle", "for", "iterate"], a: 2 },
  { q: "JS created by?", o: ["Google", "Apple", "Netscape", "IBM"], a: 2 },
  { q: "JS is ___ language", o: ["Binary", "Compiled", "Interpreted", "None"], a: 2 }
];


let i = 0;
let score = 0;
let time = 120;
let timer;

const qEl = document.getElementById("question");
const optEl = document.getElementById("options");
const next = document.getElementById("nextBtn");
const timerEl = document.getElementById("timer");
const progress = document.getElementById("progress");
const result = document.getElementById("result");
const scoreText = document.getElementById("scoreText");
const startBtn = document.getElementById("startBtn");



let audioCtx;

function playTick() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.frequency.value = 800;
  osc.type = "square";

  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}



function startTimer() {
  timer = setInterval(() => {
    time--;

    playTick();

    const m = String(Math.floor(time / 60)).padStart(2, "0");
    const s = String(time % 60).padStart(2, "0");
    timerEl.textContent = `${m}:${s}`;

    if (time <= 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);
}


function loadQuestion() {
  next.disabled = true;
  optEl.innerHTML = "";

  const cur = questions[i];
  qEl.textContent = cur.q;
  progress.textContent = `${i + 1} / ${questions.length}`;

  cur.o.forEach((text, idx) => {
    const div = document.createElement("div");
    div.textContent = text;
    div.className = "option";
    div.onclick = () => selectOption(div, idx);
    optEl.appendChild(div);
  });
}


function selectOption(el, idx) {
  const correct = questions[i].a;

  document.querySelectorAll(".option").forEach(o => o.style.pointerEvents = "none");

  if (idx === correct) {
    el.classList.add("correct");
    score++;
  } else {
    el.classList.add("wrong");
    optEl.children[correct].classList.add("correct");
  }

  next.disabled = false;
}


next.onclick = () => {
  i++;

  if (i < questions.length) loadQuestion();
  else showResult();
};


function showResult() {
  clearInterval(timer);

  qEl.style.display = "none";
  optEl.style.display = "none";
  next.style.display = "none";
  progress.style.display = "none";

  result.classList.remove("hide");

  const percent = Math.round((score / questions.length) * 100);
  scoreText.textContent = `Your Score: ${score}/${questions.length} (${percent}%)`;
}



startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";   
  next.style.display = "block";      
  loadQuestion();
  startTimer();
});
