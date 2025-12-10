/**
 * Advent of Code: Day 2 - 2025
 * https://adventofcode.com/2025/day/2
 * @premise Find the sum of all invalid IDs given a set of ranges. Invalid IDs are numbers that have sequences of repeating digits twice.
 * For example, 99 is an invalid id. 101101 is an invalid id.
 */

import fs from 'fs';

/**
 * @note A helper function to determine if an ID is valid.
 */
function isIdValid(id: string): boolean {
    const left = id.slice(0, id.length / 2);
    const right = id.slice(id.length / 2);
    return left === right;
}

/**
 * @note A helper function to determine if an ID is valid.
 * I tried to do a regex solution initially but was a little off; thankfully the YT video helped.
 * Source: https://www.youtube.com/watch?v=-G-nU0NVouI
 */
function isIdValidRegex(id: string): boolean {
    return /^(\d+)\1$/.test(id);
}

/**
 * @note The same function but for the V2 version.
 */
function isIdValidV2(id: string): boolean {
    return /^(\d+)\1+$/.test(id); // + means find one or more of
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
            if (isIdValidRegex(String(i))) {
                sum += i;
            }
        }
    });

    return sum;
}

/**
 * @second Find the sum of all invalid IDs but, invalid IDs are now any sequence of digits repeated AT LEAST twice.
 */
function findInvalidIdSumV2(ranges: string[]): number {
    let sum = 0;

    ranges.forEach(range => {
        const [start, end] = range.split('-');
        // Brute force
        for (let i = Number(start); i <= Number(end); i++) {
            if (isIdValidV2(String(i))) {
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
const result2 = findInvalidIdSumV2(arr);
console.log(result1);
console.log(result2);

