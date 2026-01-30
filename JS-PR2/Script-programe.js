var out = document.getElementById("out");

/* 1. Multiplication Table (while loop) */
out.innerText += "1. Multiplication Table\n";
var num = 5;
var i = 1;
while (i <= 10) {
  out.innerText += num + " x " + i + " = " + (num * i) + "\n";
  i++;
}
out.innerText += "\n";

/* 2. Factorial (while loop) */
out.innerText += "2. Factorial\n";
var n = 5;
var fact = 1;
while (n > 0) {
  fact = fact * n;
  n--;
}
out.innerText += "Factorial = " + fact + "\n\n";

/* 3. Armstrong number list (do while loop) */
out.innerText += "3. Armstrong Numbers (1 to 500)\n";
var x = 1;
do {
  var temp = x;
  var sum = 0;
  while (temp > 0) {
    var d = temp % 10;
    sum += d * d * d;
    temp = Math.floor(temp / 10);
  }
  if (sum === x) {
    out.innerText += x + " ";
  }
  x++;
} while (x <= 500);
out.innerText += "\n\n";

/* 4. Palindrome number list (while loop) */
out.innerText += "4. Palindrome Numbers (1 to 200)\n";
var p = 1;
while (p <= 200) {
  var t = p;
  var rev = 0;
  while (t > 0) {
    rev = rev * 10 + (t % 10);
    t = Math.floor(t / 10);
  }
  if (rev === p) {
    out.innerText += p + " ";
  }
  p++;
}
out.innerText += "\n\n";

/* 5. Fibonacci Series (while loop) */
out.innerText += "5. Fibonacci Series\n";
var a = 0, b = 1, count = 1;
while (count <= 10) {
  out.innerText += a + " ";
  var c = a + b;
  a = b;
  b = c;
  count++;
}
out.innerText += "\n\n";

/* 6. Sum between 0 and 30 (do while loop) */
out.innerText += "6. Sum from 0 to 30\n";
var s = 0;
var j = 0;
do {
  s += j;
  j++;
} while (j <= 30);
out.innerText += "Total = " + s + "\n\n";

/* 7. FizzBuzz (do while loop) */
out.innerText += "7. FizzBuzz\n";
var k = 1;
do {
  if (k % 3 === 0 && k % 5 === 0)
    out.innerText += "FizzBuzz\n";
  else if (k % 3 === 0)
    out.innerText += "Fizz\n";
  else if (k % 5 === 0)
    out.innerText += "Buzz\n";
  else
    out.innerText += k + "\n";
  k++;
} while (k <= 100);
out.innerText += "\n";

/* 8. 1-2-3-4-5-6-7-8-9-10 (for loop) */
out.innerText += "8. Number Series\n";
var str = "";
for (var i = 1; i <= 10; i++) {
  str += i;
  if (i < 10) str += "-";
}
out.innerText += str + "\n\n";

/* 9. 1+4+9+16+...+100 = 385 */
out.innerText += "9. Square Series\n";
var sumSq = 0;
var text = "";
for (var i = 1; i <= 10; i++) {
  sumSq += i * i;
  text += i * i;
  if (i < 10) text += "+";
}
out.innerText += text + " = " + sumSq + "\n\n";

/* 10. Pattern */
out.innerText += "10. Pattern\n";
for (var i = 5; i >= 1; i--) {
  for (var j = 5; j >= i; j--) {
    out.innerText += j + " ";
  }
  out.innerText += "\n";
}
out.innerText += "\n";

/* 11. Number Pattern */
out.innerText += "11. Number Pattern\n";
var numVal = 1;
for (var i = 1; i <= 5; i++) {
  for (var j = 1; j <= i; j++) {
    out.innerText += numVal + " ";
    numVal++;
  }
  out.innerText += "\n";
}
