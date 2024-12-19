import fs from 'fs';

// Using quicksort to implement sorting algorithm.
// As this is a ts file, use npx tsx to run this file.

// Swap function
function swap(arr: number[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Partition function to use in quicksort
function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }

    swap(arr, i + 1, high);
    return i + 1;
}

// Main quicksort function
function quicksort(arr: number[], low: number, high: number): number | void {
    if (low > high) {
        return -1;
    }

    const index = partition(arr, low, high);
    quicksort(arr, low, index - 1);
    quicksort(arr, index + 1, high);
}

// Process input.
const input = fs.readFileSync('day1input.txt', 'utf-8');
const arr = input.trim().split('\n');

const arr1: number[] = [];
const arr2: number[] = [];

// Split the input text file into two arrays, that we will then use to sort.
arr.forEach((line: string) => {
    const [num1, num2] = line.trim().split(/\s+/);
    arr1.push(Number(num1));
    arr2.push(Number(num2));
});

// Sort both arrays
quicksort(arr1, 0, arr1.length - 1);
quicksort(arr2, 0, arr2.length - 1);

// Both arrs should have the same size
let runningSum = 0;

for (let k = 0; k < arr1.length; k++) {
    runningSum += Math.abs(arr1[k] - arr2[k]);
}

console.log('Your sum is:', runningSum);

/** This marks the end of the first part of the problem. For the second part of the problem, let's use a cache. */

// We'll just use a simple in-memory cache.
const similarityCache = {};

// Let's make counting occurrences easier. No need to do for loop
function countOccurrences(num: number, arr: number[]): number {
    return arr.filter(n => n === num).length;
}

let similarityScore = 0;

arr1.forEach(num => {
    // If we already have a cached value, just use that
    if (similarityCache[num]) {
        similarityScore += num * similarityCache[num];
    } else {
        // Else, compute occurrences and add to cache
        const score = num * countOccurrences(num, arr2);
        similarityScore += score;
        similarityCache[num] = score;
    }
});

console.log('Your similiarity score is:', similarityScore);