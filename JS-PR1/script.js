// 1. Area of Triangle
function triangleArea() {
  let base = 10;
  let height = 5;
  let area = 0.5 * base * height;
  document.getElementById("triangle").innerText =
    "Area = " + area;
}

// 2. Temperature Conversion
function temperature() {
  let c = 25;
  let f = (c * 9/5) + 32;
  document.getElementById("temp").innerText =
    c + "°C = " + f + "°F";
}

// 3. Area of Rectangle
function rectangleArea() {
  let length = 8;
  let width = 4;
  let area = length * width;
  document.getElementById("rectangle").innerText =
    "Area = " + area;
}

// 4. Area of Circle
function circleArea() {
  let r = 7;
  let area = Math.PI * r * r;
  document.getElementById("circle").innerText =
    "Area = " + area.toFixed(2);
}

// 5. Feet to Inches
function feetToInches() {
  let feet = 6;
  let inches = feet * 12;
  document.getElementById("feet").innerText =
    feet + " feet = " + inches + " inches";
}

// 6. Algebra Formulas
function formulas() {
  let a = 3, b = 2, c = 1;

  let output = "";
  output += "a² - b² = " + ((a-b)*(a+b)) + "\n";
  output += "(a-b)² = " + (a*a - 2*a*b + b*b) + "\n";
  output += "(a+b+c)² = " + (a*a + b*b + c*c + 2*a*b + 2*a*c + 2*b*c) + "\n";
  output += "(a-b-c)² = " + (a*a + b*b + c*c - 2*a*b - 2*a*c + 2*b*c) + "\n";
  output += "(a-b)³ = " + (a*a*a - 3*a*a*b + 3*a*b*b - b*b*b);

  document.getElementById("formula").innerText = output;
}
