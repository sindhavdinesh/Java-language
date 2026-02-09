const slides = document.getElementById("slides");
const totalSlides = slides.children.length;
const dotsContainer = document.getElementById("dots");

let index = 0;

const Images = [
  { path: "https://images.hdqwalls.com/wallpapers/bthumb/itachi-uchiha-silent-protector-lm.jpg" },
  { path: "https://images.hdqwalls.com/wallpapers/bthumb/sasuke-uchiha-mh.jpg" },
  { path: "https://images.hdqwalls.com/download/sharingan-naruto-tf-2560x1440.jpg" },
  { path: "https://images.hdqwalls.com/wallpapers/obito-uchiha-mask-of-the-fallen-p6.jpg" },
  { path: "https://images.hdqwalls.com/download/satoru-gojo-the-sorcerer-supreme-56-1366x768.jpg" }
];

function displayImage(i) {
  image.src = Images[i].path;
  bg.style.backgroundImage = `url(${Images[i].path})`;
}

/* Create dots */
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.onclick = () => goToSlide(i);
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");

function updateSlider() {
  slides.style.transform = `translateX(-${index * 100}%)`;
  
  document.body.style.backgroundImage =
  `url(${slides.children[index].querySelector("img").src})`;


  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

function nextSlide() {
  index = (index + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(i) {
  index = i;
  updateSlider();
}


/* Start */
updateSlider();

