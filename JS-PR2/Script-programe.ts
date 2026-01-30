// JS PR-3 Repetition Logic - TypeScript
// Console based (no DOM)

export {}; // 🔥 IMPORTANT: global scope error fix

// 1. Multiplication Table
let tableNum: number = 5;
let tableIndex: number = 1;

while (tableIndex <= 10) {
  console.log(tableNum + " x " + tableIndex + " = " + (tableNum * tableIndex));
  tableIndex++;
}

// 2. Factorial
let factNum: number = 5;
let factorial: number = 1;

while (factNum > 0) {
  factorial *= factNum;
  factNum--;
}
console.log("Factorial =", factorial);

// 3. Fibonacci Series
let first: number = 0;
let second: number = 1;
let fibCount: number = 1;

while (fibCount <= 10) {
  console.log(first);
  let next: number = first + second;
  first = second;
  second = next;
  fibCount++;
}
