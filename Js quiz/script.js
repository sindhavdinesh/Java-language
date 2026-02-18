document.addEventListener("DOMContentLoaded", () => {

  
  const questions = [
  { q: "What type of language is JavaScript?", o: ["Compiled", "Interpreted", "Machine", "Assembly"], a: 1 },
  { q: "What is the file extension of JavaScript?", o: [".java", ".js", ".py", ".txt"], a: 1 },
  { q: "What does DOM stand for?", o: ["Document Object Model", "Data Object Model", "Digital Object Map", "None"], a: 0 },
  { q: "Which method is used to display output in the browser console?", o: ["print()", "console.log()", "echo()", "write()"], a: 1 },
  { q: "Which keyword is used to declare a variable in JavaScript?", o: ["int", "var", "define", "string"], a: 1 },
  { q: "Which company developed JavaScript?", o: ["Google", "Microsoft", "Netscape", "IBM"], a: 2 },
  { q: "Which attribute is used to handle a click event?", o: ["onhover", "onclick", "onpress", "onchangevalue"], a: 1 },
  { q: "What is the first index of an array in JavaScript?", o: ["0", "1", "-1", "Depends"], a: 0 },
  { q: "Which keyword is used to define a function in JavaScript?", o: ["method", "def", "function", "func"], a: 2 },
  { q: "Where does JavaScript mainly run?", o: ["Server only", "Browser", "Database", "Compiler"], a: 1 }
];


 
  let i = 0;
  let score = 0;
  let time = 60;
  let timer;
  let audioCtx;

  
  const startScreen = document.getElementById("startScreen");
  const quizScreen = document.getElementById("quizScreen");
  const resultScreen = document.getElementById("resultScreen");

  const qEl = document.getElementById("question");
  const optEl = document.getElementById("options");
  const nextBtn = document.getElementById("nextBtn");
  const progress = document.getElementById("progress");
  const timerEl = document.getElementById("timer");
  const scoreText = document.getElementById("scoreText");

  
  function playTick() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.frequency.value = 800;
    osc.type = "square";

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  }

  
  function startQuiz() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    startScreen.classList.add("hide");
    quizScreen.classList.remove("hide");

    loadQ();
    startTimer();
  }

  
  function loadQ() {
    const cur = questions[i];
    qEl.textContent = cur.q;
    progress.textContent = `${i + 1} / ${questions.length}`;
    optEl.innerHTML = "";

    const letters = ["A", "B", "C", "D"];

    cur.o.forEach((text, idx) => {
      const div = document.createElement("div");

      div.className = "option";
      div.innerHTML = `
        <span class="letter">${letters[idx]}.</span>
        <span class="text">${text}</span>
      `;

      div.onclick = () => select(div, idx);
      optEl.appendChild(div);
    });
  }

  
  function select(el, idx) {
    const correct = questions[i].a;
    const all = document.querySelectorAll(".option");

    all.forEach(o => (o.style.pointerEvents = "none"));

    if (idx === correct) {
      el.classList.add("correct");
      score++;
    } else {
      el.classList.add("wrong");
      all[correct].classList.add("correct");
    }
  }

  
  nextBtn.onclick = () => {
    i++;
    if (i < questions.length) loadQ();
    else showResult();
  };

  
  function startTimer() {
    timer = setInterval(() => {
      time--;
      playTick();
      timerEl.textContent = time + "s";
      if (time <= 0) showResult();
    }, 1000);
  }

 
  function showResult() {
    clearInterval(timer);

    quizScreen.classList.add("hide");
    resultScreen.classList.remove("hide");

    const percent = Math.round((score / questions.length) * 100);
    scoreText.textContent = `Score: ${score}/${questions.length} | ${percent}%`;
  }

 
  function restartQuiz() {
    location.reload();
  }

  
  window.startQuiz = startQuiz;
  window.restartQuiz = restartQuiz;

});
