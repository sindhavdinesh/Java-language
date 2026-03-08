function getWeather() {
  let city = document.getElementById('cityInput').value.trim();

  if(city === "") {
    return; 
  }

  let apiKey = 'f83daa9d6894dfe511eb7bdd5e781795';
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetchWeather(url);
}

document.getElementById("cityInput")
  .addEventListener("keydown", function(e){
    if(e.key === "Enter"){
      if(this.value.trim() !== ""){
        getWeather();
      }
    }
});

async function fetchWeather(url){
  const loader = document.getElementById("loader");
  const card = document.getElementById("weatherCard");
  const errorDiv = document.getElementById("error");

  loader.classList.remove("hidden");
  card.classList.add("hidden");
  errorDiv.classList.add("hidden");

  try{
    const res = await fetch(url);
    const data = await res.json();

    if(data.cod != 200){
      throw new Error(data.message);
    }

    updateUI(data);
  }
  catch(err){
    errorDiv.classList.remove("hidden");
  }
  finally{
    loader.classList.add("hidden");
  }
}

function updateUI(data){
  const card = document.getElementById("weatherCard");
  const emoji = document.getElementById("weatherEmoji");
  const body = document.body;

  document.getElementById("cityName").innerText =
      data.name + ", " + data.sys.country;

  const temp = Math.round(data.main.temp);
  document.getElementById("temperature").innerText = temp + "°C";
  document.getElementById("description").innerText =
      data.weather[0].description;

  document.getElementById("humidity").innerText =
      data.main.humidity + "%";
  document.getElementById("wind").innerText =
      data.wind.speed + " m/s";

  const root = document.documentElement;
  if(temp < 15) root.style.setProperty('--temp-color','#00f5ff');
  else if(temp > 30) root.style.setProperty('--temp-color','#ff004c');
  else root.style.setProperty('--temp-color','#ffffff');

  const condition = data.weather[0].main.toLowerCase();

  if(condition.includes("clear")){
    emoji.innerText="☀️";
    body.style.background = "linear-gradient(135deg,#f6d365,#fda085)";
  }
  else if(condition.includes("rain")){
    emoji.innerText="🌧️";
    body.style.background = "linear-gradient(135deg,#4e54c8,#8f94fb)";
  }
  else if(condition.includes("thunder")){
    emoji.innerText="⛈️";
    body.style.background = "linear-gradient(135deg,#1f1c2c,#928dab)";
  }
  else if(condition.includes("snow")){
    emoji.innerText="❄️";
    body.style.background = "linear-gradient(135deg,#83a4d4,#b6fbff)";
  }
  else if(condition.includes("cloud")){
    emoji.innerText="🌫️";
    body.style.background = "linear-gradient(135deg,#757f9a,#d7dde8)";
  }
  else{
    emoji.innerText="🌍";
    body.style.background = "linear-gradient(135deg,var(--bg-dark),var(--bg-mid),var(--bg-light))";
  }

  card.classList.remove("hidden");
}

setInterval(()=>{
  document.getElementById("dateTime").innerText =
    new Date().toLocaleString();
},1000);


document.getElementById("brightnessToggle").addEventListener("click",()=>{
  document.body.classList.toggle("light");
  localStorage.setItem("theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
});

if(localStorage.getItem("theme")==="light"){
  document.body.classList.add("light");
}