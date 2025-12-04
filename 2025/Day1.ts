/**
 * Advent of Code: Day 1 - 2025
 * https://adventofcode.com/2025/day/1
 * @premise You have a list of rotations. Each rotation is either left (L) or right (R) followed by a number of dials.
 * Given this list, the password is the number of times the dial points at zero following any rotation in the sequence.
 */

import fs from 'fs';

/**
 * @first Find the password given the list of rotations. The dial starts at 50.
 */
function findPassword(rotations: string[]): number {

    let dial = 50;
    let password = 0;
    
    // O(n) solution. Wondering if there is a better way to do it.
    rotations.forEach(rotation => {
        const direction = rotation.slice(0, 1);
        const amount = rotation.slice(1);

        // Remember that we reset when we hit 100 (i.e. go back to 0), so we need to include the modulo operator.
        // I learned that Typescript does not change the number upon doing mod by 100. So dial will be negative even after mod.
        // BUT, consider this. -18 is the same as 82. Why? Rotating right by 82 dials is the same as rotating left by 18 dials.
        // So we can just use negative numbers here, since we are tracking when the dial hits 0 anyway and nothing else.
        const turn = (direction === 'L' ? -1 : 1) * Number(amount);
        dial = (dial + turn) % 100;
        if (dial === 0) password++;
    });

    return password;
}

/**
 * Here's where things get spicy.
 * @second Find the password, except this time, the password is not just the number of times the dial points at zero
 * following any rotation, but also the number of occurrences that the dial PASSES zero.
 * 
 * Some notes:
 * If a turn causes the dial value to switch signs, it means that we passed 0. Therefore, include that in the password count.
 * Let's consider some cases. If you're at 40 and you turn L60, you're at -20 (or 80). How do we know we passed 0?
 * The previous dial value is less than the turn value. So if the direction is left and the turn value is greater than the dial value, count 0.
 * Or what if we were at 80 and we turned 30? We passed 0 because we exceeded 100.
 * Now let's say that we turn L360. We'd still be at -20 since we made three full circles. Except this time, we turned four times.
 */
function findPasswordWithPassingZeros(rotations: string[]): number {

    let dial = 50;
    let password = 0;

    // Same business as last time.
    rotations.forEach(rotation => {
        const direction = rotation.slice(0, 1);
        const amount = rotation.slice(1);

        const turn = (direction === 'L' ? -1 : 1) * Number(amount);

        const numTurns = Math.floor(turn / 100); // A turn of 1.9 would still be one turn because you didn't complete the second turn yet. Hence Math.floor()

        // We hit 0
        if ((dial + turn) % 100 == 0) {
            password += 1;
            dial = (dial + turn) % 100; // Set the dial to the new value
        }
        // Or, we turned to the right and passed the dial
        else if (dial + turn >= 100) {
            password += numTurns; // 1 for passing 0, and however many additional full rotations.
            dial = (dial + turn) % 100; // Set the dial to the new value
        }
        // Or, we turned to the left and passed the dial
        else if (dial + turn < 0) {
            password += (numTurns * -1); // 1 for passing 0, and however many additional full rotations.
            dial = 100 + ((dial + turn) % 100);
        }

        // Here we want to avoid negative numbers to avoid duplicate counts. So we set the new dial value to 100 + the dial value if it's negative, or itself if positive.
        // const newDial = (dial + turn) % 100;
    });

    return password;
}

/**
 * @main Process input and call methods.
 * Be sure to run npx tsx instead of just tsx.
 */

// Process input.
const input = fs.readFileSync('day1input.txt', 'utf-8');
const arr = input.trim().split('\n');

const result1 = findPassword(arr);
console.log("The password is:", result1);

const result2 = findPasswordWithPassingZeros(arr);
console.log("The new password is:", result2);