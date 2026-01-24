(function () {

  let output = "";

  output += "WHILE LOOP (1 to 5)\n";
  let i = 1;
  while (i <= 5) {
    output += i + " ";
    i++;
  }

  output += "\n\nDO-WHILE LOOP (1 to 5)\n";
  let j = 1;
  do {
    output += j + " ";
    j++;
  } while (j <= 5);

  output += "\n\nFOR LOOP (1 to 5)\n";
  for (let k = 1; k <= 5; k++) {
    output += k + " ";
  }

  document.getElementById("loopjs").innerText = output;

})();
