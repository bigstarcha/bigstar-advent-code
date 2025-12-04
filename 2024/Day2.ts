import fs from 'fs';

function isDifferenceSafe(num1: number, num2: number): boolean {
    const diff = Math.abs(num2 - num1);
    return diff >= 1 && diff <= 3;
}

// Dump the whole for loop in a function (thanks frontend-coder, you can check out his video at the link below)
// https://www.youtube.com/watch?v=H6Y3ze33Hl4&ab_channel=frontend-coder
function isSafe(row: number[]) {
    let inc = true; // keep two variables.
    let dec = true;
    let ok = true;
    for (let i = 0; i < row.length - 1; i++) {
        if (!isDifferenceSafe(Number(row[i]), Number(row[i + 1]))) {
            ok = false;
        }

        // Figure out if monotonic or not.
        if (Number(row[i]) > Number(row[i + 1])) {
            inc = false;
        } else if (Number(row[i]) < Number(row[i + 1])) {
            dec = false;
        }
    }
    return (inc || dec) && ok;
}

/**
 * Rules:
 * 1. Monotonically increasing or monotonically decreasing.
 * 2. Difference between each number must be 1 <= x <= 3.
 */

// Process input.
const input = fs.readFileSync('day2input.txt', 'utf-8');
const arr = input.trim().split('\n');

// Grab each line on the fly, and determine if monotonically decreasing or increasing.
let safeReports = 0;

/**
 * This is some old code that I used. It's a little verbose, so I allocated most of the work in a separate function.
 * The separate function will be used for part 2 anyway.
arr.forEach(rowStr => {
    const row = rowStr.trim().split(/\s+/);
    let inc = true; // keep two variables.
    let dec = true;
    for (let i = 0; i < row.length - 1; i++) {
        if (!isDifferenceSafe(Number(row[i]), Number(row[i + 1]))) {
            return; // Break out of the inner loop, and go to the next row in the outer forEach loop.
            // I assume that you'd want to use return instead of break since return actually goes to the'
            // next iteration of the outer loop, while break just exits the for loop but still calls everything below.
        } else {
            // Figure out if monotonic or not.
            if (Number(row[i]) > Number(row[i + 1])) {
                inc = false;
            } else if (Number(row[i]) < Number(row[i + 1])) {
                dec = false;
            }
        }
    }
    if (inc || dec) { // There can probably be a better solution since the solution that I have right now iterates through the entire array.
        safeReports++;
    }
});
*/

/** @Part 1: The concise way */
arr.forEach(rowStr => {
    const row = rowStr.trim().split(/\s+/).map(s => Number(s));
    if (isSafe(row)) {
        safeReports++;
    }
});

console.log('Your total number of safe reports:', safeReports);

/** @Part 2: The bewildering Problem Dampener... */
let safeReportsWithDampener = 0;

// Thanks William Y. Feng... you can check his video below
// https://www.youtube.com/watch?v=4NICD495QFE&ab_channel=WilliamY.Feng
function isTrulySafe(row) {
    if (isSafe(row)) {
        return true;
    }
    // Just remove the bad element and see if the row is still safe.
    // And by bad element, pretend that every element in the row is bad... and see if it's safe.
    // Time complexity is gonna be trash for this one, but... oh well.
    for (let i = 0; i < row.length; i++) {
        const newRow = [...row];
        newRow.splice(i, 1);
        if (isSafe(newRow)) {
            return true;
        }
    }
    return false;
}

// Not a very optimal solution... but oh well
arr.forEach(rowStr => {
    const row = rowStr.trim().split(/\s+/).map(s => Number(s));
    if (isTrulySafe(row)) {
        safeReportsWithDampener++;
    }
});

console.log('Your total number of safe reports with the dampener:', safeReportsWithDampener);