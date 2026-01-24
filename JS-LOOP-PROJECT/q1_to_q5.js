(function () {

  let output = "";

  output += "Q1) Multiplication Table of 5\n";
  let i = 1;
  while (i <= 10) {
    output += "5 x " + i + " = " + (5 * i) + "\n";
    i++;
  }

  output += "\nQ2) Factorial of 5\n";
  let fact = 1;
  i = 1;
  while (i <= 5) {
    fact *= i;
    i++;
  }
  output += "Factorial = " + fact + "\n";

  output += "\nQ3) Armstrong Numbers (1 to 500)\n";
  let n = 1;
  do {
    let temp = n, sum = 0;
    while (temp > 0) {
      let r = temp % 10;
      sum += r * r * r;
      temp = Math.floor(temp / 10);
    }
    if (sum === n) output += n + " ";
    n++;
  } while (n <= 500);

  output += "\n\nQ4) Palindrome Numbers (1 to 200)\n";
  let num = 1;
  while (num <= 200) {
    let rev = 0, t = num;
    while (t > 0) {
      rev = rev * 10 + (t % 10);
      t = Math.floor(t / 10);
    }
    if (rev === num) output += num + " ";
    num++;
  }

  output += "\n\nQ5) Fibonacci Series (10 terms)\n";
  let a = 0, b = 1, c = 1;
  while (c <= 10) {
    output += a + " ";
    let d = a + b;
    a = b;
    b = d;
    c++;
  }

  document.getElementById("q1to5").innerText = output;

})();
