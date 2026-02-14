let screen = document.getElementById("screen");
let buttons = document.querySelectorAll(".keys button");
let calculator = document.querySelector(".calculator");

/* basic functions */
function press(v){ screen.value += v; }
function clearAll(){ screen.value = ""; }

function calculate(){
  try{
    screen.value = eval(screen.value);
  }catch{
    alert("Invalid Input");
  }
}

function backspace(){
  screen.value = screen.value.slice(0, -1);
}



function toggleSign(){
  if(screen.value) screen.value = -screen.value;
}

function press(v){
  screen.value += v;
}

function clearAll(){
  screen.value = "";
}

function backspace(){
  screen.value = screen.value.slice(0, -1);
}

function calculate(){
  try{
    screen.value = eval(screen.value);
  }catch{
    alert("Invalid Input");
  }
}

function backspace(){

  let start = screen.selectionStart;   
  let end = screen.selectionEnd;

  if(start === end){
    
    screen.value =
      screen.value.slice(0, start - 1) +
      screen.value.slice(end);

    screen.setSelectionRange(start - 1, start - 1);

  } else {
    
    screen.value =
      screen.value.slice(0, start) +
      screen.value.slice(end);

    screen.setSelectionRange(start, start);
  }
}





/* 🎨 THEMES — body + buttons different shades */
const themes = [
  {
    body: "linear-gradient(145deg,#2e1065,#1e1b4b)",   
    btn:  "linear-gradient(145deg,#7c3aed,#4c1d95)"
  },
  {
    body: "linear-gradient(145deg,#0c4a6e,#082f49)",   
    btn:  "linear-gradient(145deg,#2563eb,#1e3a8a)"
  },
  {
    body: "linear-gradient(145deg,#7f1d1d,#450a0a)",  
    btn:  "linear-gradient(145deg,#dc2626,#7f1d1d)"
  },
  {
    body: "linear-gradient(145deg,#064e3b,#022c22)",   
    btn:  "linear-gradient(145deg,#10b981,#065f46)"
  }
];

let i = 0;

setInterval(() => {

  /* 🔹 calculator body color change */
  calculator.style.background = themes[i].body;

  /* 🔹 buttons color change */
  buttons.forEach(btn => {
    if(!btn.classList.contains("equal")){
      btn.style.background = themes[i].btn;
    }
  });

  /* 🔹 equal button stronger glow */
  const equalBtn = document.querySelector(".equal");
  equalBtn.style.background = themes[i].btn;
  equalBtn.style.boxShadow = "0 0 25px rgba(255,255,255,0.6)";

  i = (i + 1) % themes.length;

}, 2500);

// Keyboard support
document.addEventListener("keydown", function(e){

  if(e.key === "Enter"){     
    e.preventDefault();    
    calculate();
  }

  if(e.key === "Backspace"){ 
    backspace();
  }
});

/* ===== FULL KEYBOARD SUPPORT ===== */
document.addEventListener("keydown", function(e){

  // Numbers (0-9)
  if(!isNaN(e.key)){
    press(e.key);
  }

  // Operators
  if(["+", "-", "*", "/", "%", "."].includes(e.key)){
    press(e.key);
  }

  // Enter = calculate
  if(e.key === "Enter"){
    e.preventDefault();
    calculate();
  }

  // Backspace
  if(e.key === "Backspace"){
    backspace();
  }

  // Escape = clear
  if(e.key === "Escape"){
    clearAll();
  }
});


