import fs from 'fs';

/** @Part 1 */
// Oh no... I'm getting trauma from CS2150... Hash tables... sigh...
// Something tells me that I need to use a map (object) to cache results, as well as recursion...

// Create 2D array
const input = fs.readFileSync('testinput.txt', 'utf-8').split('\n').map(line => line.split(''));
const cache = {};

function check(i: number, j: number, flag: string) {
    if (i < 0 || i >= input.length || j < 0 || j >= input[0].length) { // input[0] since all rows are same length
        return false;
    }
    if (input[i][j] === flag) {
        
    }
}

for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[i].length - 1; j++) {
        // Need to traverse array
        // I'm stumped...
    }
}
