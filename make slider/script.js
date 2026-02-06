
const leftBtn = document.querySelector("#left-btn");
const rightBtn = document.querySelector("#right-btn");
const image = document.querySelector("#slider");
const bg = document.querySelector(".bg-blur");

let marvel = 0;

let Images = [
    { 
        path: "https://images.hdqwalls.com/wallpapers/bthumb/iron-man-advanced-suit-activated-y5.jpg" 
    },
    { 
        path: "https://images.hdqwalls.com/download/batman-rising-eu-1920x1080.jpg" 
    },
    { 
        path: "https://images.hdqwalls.com/download/black-widow-mystic-woman-eo-1920x1080.jpg" 
    },
    { 
        path: "https://images.hdqwalls.com/wallpapers/bthumb/spider-man-swing-through-the-city-xm.jpg" 
    },
    { 
        path: "https://images.hdqwalls.com/wallpapers/bthumb/hulk-green-monster-dominates-io.jpg" 
    },
    { 
        path: "https://images.hdqwalls.com/wallpapers/bthumb/scarlet-witch-red-magic-rising-av.jpg" 
    },
    { 
        path: "https://images.hdqwalls.com/wallpapers/bthumb/unstoppable-black-panther-cf.jpg" 
    },
    { 
        path: "https://images.hdqwalls.com/wallpapers/bthumb/captain-hydra-depths-of-power-bx.jpg" 
    },
    { 
        path: "https://images.hdqwalls.com/wallpapers/bthumb/deadpool-the-red-anti-hero-returns-ls.jpg"
    },
    { 
        path: "https://images.hdqwalls.com/wallpapers/bthumb/hawkeye-2022-2u.jpg" 
    }
]
function displayImage(index) {
    image.src = Images[index].path;
    bg.style.backgroundImage = `url(${Images[index].path})`;
}

leftBtn.addEventListener("click", () => {
    marvel = marvel === 0 ? Images.length - 1 : marvel - 1;
    displayImage(marvel);
});

rightBtn.addEventListener("click", () => {
    marvel = marvel === Images.length - 1 ? 0 : marvel + 1;
    displayImage(marvel);
});

displayImage(marvel);
