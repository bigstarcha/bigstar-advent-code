/**
 * Advent of Code: Day 2 - 2025
 * https://adventofcode.com/2025/day/2
 * @premise Find the sum of all invalid IDs given a set of ranges. Invalid IDs are numbers that have sequences of repeating digits twice.
 * For example, 99 is an invalid id. 101101 is an invalid id.
 */

import fs from 'fs';

/**
 * @note A helper function to determine if an ID is valid.
 * Let's use regex here.
 */
function isIdValid(id: string): boolean {
    const pattern: RegExp = /(\d){2}/; // Any sequence of digits repeated two times I think. \d matches any integer, {n} means exactly n times.
    return pattern.test(id);
}

/**
 * @first Find the sum of all invalid IDs.
 * I think I might have to brute force this. Can't think of a better solution at the moment.
 */
function findInvalidIdSum(ranges: string[]): number {
    let sum = 0;

    ranges.forEach(range => {
        const [start, end] = range.split('-');
        // Brute force
        for (let i = Number(start); i <= Number(end); i++) {
            if (isIdValid(String(i))) {
                console.log(i, "matches the regular expression.");
                sum += i;
            }
        }
    });

    return sum;
}

// Process input.
const input = fs.readFileSync('day2input.txt', 'utf-8');
const arr = input.trim().split(/[,\n]/).filter(range => range !== ''); // Split by comma and new line. Filter out empty strings.

const result1 = findInvalidIdSum(arr);
console.log(result1);

