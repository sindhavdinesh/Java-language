(function () {

  let output = "";
  for (let i = 5; i >= 1; i--) {
    for (let j = 5; j >= i; j--) {
      output += j + " ";
    }
    output += "\n";
  }

  document.getElementById("q10").innerText = output;

})();
