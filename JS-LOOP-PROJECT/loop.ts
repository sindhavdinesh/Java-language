export {};

let output: string = "";

output += "WHILE LOOP (1 to 5)\n";
let i: number = 1;
while (i <= 5) {
  output += i + " ";
  i++;
}

output += "\n\nDO-WHILE LOOP (1 to 5)\n";
let j: number = 1;
do {
  output += j + " ";
  j++;
} while (j <= 5);

output += "\n\nFOR LOOP (1 to 5)\n";
for (let k: number = 1; k <= 5; k++) {
  output += k + " ";
}

console.log(output);
