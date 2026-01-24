(function () {

  let output = "";
  let num = 1;

  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= i; j++) {
      output += num + " ";
      num++;
    }
    output += "\n";
  }

  document.getElementById("q11").innerText = output;

})();
