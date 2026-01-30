
function getdata() {
    let name = document.querySelector("#get_name").value;

    if (name == "") {
        document.querySelector(".message").style.scale = "2.5";
        getdata();
    }
    document.querySelector(".name").textContent = name;

    document.querySelector(".getname").style.display = "none";
    document.querySelector("#blink").style.display = "none";
    document.querySelector(".main_cont").style.display = "block";

}


function change_mode() {
    let root = document.documentElement;
    let style = getComputedStyle(root);

    let current_bg = style.getPropertyValue("--bg-color").trim();

    if (current_bg == "#000000eb") {
        root.style.setProperty("--bg-color", "#fff");
        root.style.setProperty("--text-color", "#000000eb");
    }
    else {
        root.style.setProperty("--bg-color", "#000000eb");
        root.style.setProperty("--text-color", "#fff");
    }

    let icon = document.querySelector("i");

    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");
}

// score

var c_score = 0;
var u_score = 0;



// r p c

let inp;
function rock() {

    const min = 1;
    const max = 3;

    let comp = Math.floor((Math.random() * (max - min + 1)) + min);

    document.querySelector("#uc").src = "img/rock.png";
    document.querySelector("#uc").style.display = "inline-block";


    if (comp == 1) {
        let root = document.documentElement;
        let style = getComputedStyle(root);

        root.style.setProperty("--winner-color", "orange");
        document.querySelector("#winner").textContent = "TIE";

        document.querySelector("#cc").src = "img/rock.png";
        document.querySelector("#cc").style.display = "inline-block";


    }
    else if (comp == 2) {
        let root = document.documentElement;
        let style = getComputedStyle(root);

        root.style.setProperty("--winner-color", "red");
        document.querySelector("#winner").textContent = "YOU LOOSE";

        c_score++;
        document.querySelector(".c_score").innerHTML = c_score;

        document.querySelector("#cc").src = "img/paper.png";
        document.querySelector("#cc").style.display = "inline-block";


    }
    else if (comp == 3) {
        let root = document.documentElement;
        let style = getComputedStyle(root);

        root.style.setProperty("--winner-color", "green");
        document.querySelector("#winner").textContent = "YOU WIN";

        u_score++;
        document.querySelector(".u_score").innerHTML = u_score;

        document.querySelector("#cc").src = "img/scissors.png";
        document.querySelector("#cc").style.display = "inline-block";



    }

}

function paper() {

    const min = 1;
    const max = 3;

    let comp = Math.floor((Math.random() * (max - min + 1)) + min);

    document.querySelector("#uc").src = "img/paper.png";
    document.querySelector("#uc").style.display = "inline-block";



    if (comp == 1) {
        let root = document.documentElement;
        let style = getComputedStyle(root);
        root.style.setProperty("--winner-color", "green");
        document.querySelector("#winner").textContent = "YOU WIN";

        u_score++;
        document.querySelector(".u_score").innerHTML = u_score;

        document.querySelector("#cc").src = "img/rock.png";
        document.querySelector("#cc").style.display = "inline-block";



    }
    else if (comp == 2) {
        let root = document.documentElement;
        let style = getComputedStyle(root);

        let notice_color = style.getPropertyValue("--winner-color").trim();
        root.style.setProperty("--winner-color", "orange");
        document.querySelector("#winner").textContent = "TIE";

        document.querySelector("#cc").src = "img/paper.png";
        document.querySelector("#cc").style.display = "inline-block";


    }

    else if (comp == 3) {
        let root = document.documentElement;
        let style = getComputedStyle(root);

        root.style.setProperty("--winner-color", "red");
        document.querySelector("#winner").textContent = "YOU LOOSE";

        c_score++;
        document.querySelector(".c_score").innerHTML = c_score;

        document.querySelector("#cc").src = "img/scissors.png";
        document.querySelector("#cc").style.display = "inline-block";


    }
}

function scissor() {

    const min = 1;
    const max = 3;

    let comp = Math.floor((Math.random() * (max - min + 1)) + min);

    document.querySelector("#uc").src = "img/scissors.png";
    document.querySelector("#uc").style.display = "inline-block";



    if (comp == 3) {
        let root = document.documentElement;
        let style = getComputedStyle(root);

        let notice_color = style.getPropertyValue("--winner-color").trim();
        root.style.setProperty("--winner-color", "orange");
        document.querySelector("#winner").textContent = "TIE";

        document.querySelector("#cc").src = "img/scissors.png";
        document.querySelector("#cc").style.display = "inline-block";


    }
    else if (comp == 1) {
        let root = document.documentElement;
        let style = getComputedStyle(root);

        root.style.setProperty("--winner-color", "red");
        document.querySelector("#winner").textContent = "YOU LOOSE";

        c_score++;
        document.querySelector(".c_score").innerHTML = c_score;

        document.querySelector("#cc").src = "img/rock.png";
        document.querySelector("#cc").style.display = "inline-block";



    }
    else if (comp == 2) {
        let root = document.documentElement;
        let style = getComputedStyle(root);

        root.style.setProperty("--winner-color", "green");
        document.querySelector("#winner").textContent = "YOU WIN";

        u_score++;
        document.querySelector(".u_score").innerHTML = u_score;

        document.querySelector("#cc").src = "img/paper.png";
        document.querySelector("#cc").style.display = "inline-block";


    }

}

