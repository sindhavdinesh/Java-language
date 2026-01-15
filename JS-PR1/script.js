let out = document.getElementById("output");

// 1. Area of Triangle
let base = Number(prompt("Enter base of triangle"));
let height = Number(prompt("Enter height of triangle"));
out.innerHTML += "1) Area of Triangle = " + (0.5 * base * height) + "<br><br>";

// 2. Celsius to Fahrenheit
let celsius = Number(prompt("Enter temperature in Celsius"));
out.innerHTML += "2) Fahrenheit = " + ((celsius * 9/5) + 32) + "<br><br>";

// 3. Area of Rectangle
let length = Number(prompt("Enter length"));
let width = Number(prompt("Enter width"));
out.innerHTML += "3) Area of Rectangle = " + (length * width) + "<br><br>";

// 4. Area of Circle
let radius = Number(prompt("Enter radius"));
out.innerHTML += "4) Area of Circle = " + (3.14 * radius * radius) + "<br><br>";

// 5. Feet to Inches
let feet = Number(prompt("Enter feet"));
out.innerHTML += "5) Inches = " + (feet * 12) + "<br><br>";

// 6. (a² − b²)
let a = Number(prompt("Enter value of a"));
let b = Number(prompt("Enter value of b"));
out.innerHTML += "6) a² - b² = " + ((a - b) * (a + b)) + "<br><br>";

// 7. (a − b)²
out.innerHTML += "7) (a - b)² = " + ((a*a) - (2*a*b) + (b*b)) + "<br><br>";

// 8. (a + b + c)²
let c = Number(prompt("Enter value of c"));
out.innerHTML += "8) (a + b + c)² = " +
((a*a)+(b*b)+(c*c)+(2*a*b)+(2*a*c)+(2*b*c)) + "<br><br>";

// 9. (a − b − c)²
out.innerHTML += "9) (a - b - c)² = " +
((a*a)+(b*b)+(c*c)-(2*a*b)-(2*a*c)+(2*b*c)) + "<br><br>";

// 10. (a − b)³
out.innerHTML += "10) (a - b)³ = " +
((a*a*a)-(3*a*a*b)+(3*a*b*b)-(b*b*b));
