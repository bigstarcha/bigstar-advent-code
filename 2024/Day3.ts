import fs from 'fs';

/** @Part 1 */

// This looks. Awful.
// The thing that we will probably need to do is regex evaluation. Then store all correct regexes into an array.

// The nice thing is, there is a match function! (Thanks ChatGPT... even though I didn't ask this problem directly with ChatGPT)
const input = fs.readFileSync('day3input.txt', 'utf-8');
const allMuls = input.match(/mul\(\d+\,\d+\)/g) || []; // Good regex practice.

let sumOfMuls = 0;
allMuls.forEach(mul => {
    const cleanStr = mul.replace("mul(", "").replace(")", "");
    const [num1, num2] = cleanStr.split(",");
    sumOfMuls += Number(num1) * Number(num2);
});

console.log("Sum of muls:", sumOfMuls);

// Ok, not as bad as I thought... just needed to get the correct regex expression.

/** @Part 2 */
// We can probably store all do's and dont's in a separate array... or not? We will have to store everything in one array. Which means harder regex evaluation.
// But the thing is, you can use a pipe operator if you want to match any one of multiple patterns!

const allMulsDosDonts = input.match(/mul\(\d+\,\d+\)|do\(\)|don\'t\(\)/g) || [];

// This flag enables mul operations.
let enableMuls = true; // At the beginning of the program, mul instructions are enabled.
let sumOfMuls2 = 0;

allMulsDosDonts.forEach(mul => {
    if (mul === "don't()") {
        enableMuls = false;
    } else if (mul === "do()") {
        enableMuls = true;
    }
    else {
        // Only do the operation if enableMuls is true
        if (enableMuls) {
            const cleanStr = mul.replace("mul(", "").replace(")", "");
            const [num1, num2] = cleanStr.split(",");
            sumOfMuls2 += Number(num1) * Number(num2);
        }
    }
});

console.log("Sum of muls with do's and dont's:", sumOfMuls2);
