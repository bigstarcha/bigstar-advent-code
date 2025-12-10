/**
 * Advent of Code: Day 3 - 2025
 * https://adventofcode.com/2025/day/3
 * @premise Find the largest joltage per bank. A bank is a line of digits, where the joltage is any two nonconsecutive orders where the first is
 * positionally before the second. Then, find the sum of the largest joltages from each bank.
 */

import fs from 'fs';

/**
 * @first Find the sum of the largest joltages from each bank.
 * @precondition lp and rp will never exceed the bank length.
 * I think this is a two pointer problem. We know that the first battery will always positionally precede the second battery in the bank.
 */
function findMaximumJoltage(bank: string): number {
    let lp = 0; // Left pointer
    let battery1 = Number(bank.at(lp));

    // The left pointer should always be less than the right pointer because the first battery always positionally precedes the second battery.

    // Let's do a for loop with another variable, i, so that we can update battery1 and lp values and keep track of the lp value where the max battery1 value is.
    // We don't want to cover the entire array as we need the last string position for the right pointer in the case that the max joltage value is the last two digits.
    for (let i = 1; i < bank.length - 1; i++) {
        // If we find a battery value that's greater than battery1, replace battery1 with the new battery value
        if (Number(bank.at(i)) > battery1) {
            battery1 = Number(bank.at(i));
            lp = i; // Also, update the left pointer position.
        }
    }

    let battery2 = Number(bank.at(lp + 1));

    // Now iterate through the right battery value.
    for (let rp = lp + 1; rp < bank.length; rp++) {
        // If we find a battery value that's greater than battery2, replace battery2 with the new battery value
        if (Number(bank.at(rp)) > battery2) {
            battery2 = Number(bank.at(rp));
        }
    }

    return (10 * battery1) + battery2;
}

function findJoltageSum(banks: string[]): number {
    let sum = 0;
    banks.forEach(bank => {
        sum += findMaximumJoltage(bank);
    });

    return sum;
}

/**
 * @second Find the sum of the largest joltages from each bank, except now each joltage value needs to have 12 digits.
 * 12 pointers would be extremely inefficient and impractical. Some people have mentioned the usage of DP/Greedy algorithms, so I'm going to try that.
 */
function findMaximumJoltageV2(bank: string): number {
    // https://www.youtube.com/watch?v=PVbLd6zOVhg
    // I watched part of the above video and it makes sense. We want to make sure that we iterate only up to when there's 11 digits remaining, since if we
    // don't find a max till then, just grab the last 12 digits since the 12th to last digit would be the max.
    // After that, since we can't look at numbers before the index of the first max, we just narrow the search space!
    let fp = 0; // First pointer
    let digitsRemaining = 11; // Number of digits left.
    let battery = Number(bank.at(fp));

    let numberString = "";
    
    // While the pointer does not exceed the bank's length minus number of digits remaining (if it did, then we would not have any string to work with!)
    while (digitsRemaining >= 0) {
        // Iterate from the value of the first pointer to the index before the amount of digits remaining.
        for (let i = fp + 1; i < bank.length - digitsRemaining; i++) {
            if (Number(bank.at(i)) > battery) {
                battery = Number(bank.at(i));
                fp = i;
            }
        }
        // Make sure that at the end of each for loop, we decrement the number of digits remaining, since each maximum we find, one less digit to work with.
        // Also make sure to concatenate the digit to the final string.
        numberString += battery;
        digitsRemaining--;
        fp++; // Don't know why we are incrementing (video says so)
    }

    numberString += bank.substring(bank.length - 1 - digitsRemaining);
    console.log('Bank:', bank, 'NumberString:', numberString);
    return Number(numberString);
}

function findJoltageSum2(banks: string[]): number {
    let sum = 0;
    banks.forEach(bank => {
        sum += findMaximumJoltageV2(bank);
    });

    return sum;
}

// Process input.
const input = fs.readFileSync('day3input.txt', 'utf-8');
const arr = input.trim().split('\n');
const result1 = findJoltageSum(arr);
const result2 = findJoltageSum2(arr);
console.log(result1);
console.log(result2);
