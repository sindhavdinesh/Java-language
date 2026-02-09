const leftBtn = document.querySelector("#left-btn");
const rightBtn = document.querySelector("#right-btn");
const image = document.querySelector("#slider");
const bg = document.querySelector(".bg-blur");

let index = 0;

const Images = [
  { path: "https://i.pinimg.com/736x/e8/b5/03/e8b503d871c957936b2649d07500a2ed.jpg" },
  { path: "https://i.pinimg.com/1200x/31/b0/a8/31b0a8737cdbb4cfe49823b5615406dd.jpg" },
  { path: "https://i.pinimg.com/1200x/ca/a1/b0/caa1b0b608f23ccc7f570c4a4688d19b.jpg" },
  { path: "https://i.pinimg.com/1200x/6e/59/bf/6e59bf99bc8658ac42dd310a299b3135.jpg" },
  { path: "https://i.pinimg.com/736x/25/f8/6c/25f86c0f713af9a4feb02069fe6a1a0d.jpg" }
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
