(function () {

  let output = "";

  output += "Q7) FizzBuzz (1 to 100)\n";
  for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) output += "FizzBuzz ";
    else if (i % 3 === 0) output += "Fizz ";
    else if (i % 5 === 0) output += "Buzz ";
    else output += i + " ";
  }

  output += "\n\nQ8) 1-2-3-4-5-6-7-8-9-10\n";
  for (let i = 1; i <= 10; i++) {
    output += i;
    if (i < 10) output += "-";
  }

  output += "\n\nQ9) Sum = ";
  let sum = 0;
  for (let i = 1; i <= 10; i++) sum += i * i;
  output += sum;

  document.getElementById("q7to9").innerText = output;

})();
