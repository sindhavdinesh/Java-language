(function () {

  let i = 0, lhs = 0;
  do {
    lhs += i;
    i++;
  } while (i <= 30);

  let n = 30;
  let rhs = (n * (n + 1)) / 2;

  let output = "";
  output += "Q6) Proof of Sum from 0 to 30\n";
  output += "LHS = " + lhs + "\n";
  output += "RHS = " + rhs + "\n\n";
  output += "RESULT: PROVED (LHS = RHS)";

  document.getElementById("q6").innerText = output;

})();
