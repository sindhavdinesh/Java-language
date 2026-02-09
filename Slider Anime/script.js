const leftBtn = document.querySelector("#left-btn");
const rightBtn = document.querySelector("#right-btn");
const image = document.querySelector("#slider");
const bg = document.querySelector(".bg-blur");

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

/* Left button */
leftBtn.addEventListener("click", () => {
  index = (index - 1 + Images.length) % Images.length;
  displayImage(index);
});

/* Right button */
rightBtn.addEventListener("click", () => {
  index = (index + 1) % Images.length;
  displayImage(index);
});

/* First image load */
displayImage(index);
