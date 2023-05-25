/*
We're going to approach this problem using a binary search algorithm where we'll be able to search through
a sorted list efficintly by repeatedly dividing a porition of the list in half, until we've narrow down the location
of the target.

We'll set two pointers, one at the start of the list and other at the end of the list.
And from there, we'll do a comparison of values with the targert and depending
on the outcome, we'll either move the left or right pointer until we're closer to the target.
*/

/*
Question:
Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. 
If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.
*/
const NOT_FOUND = -1;

const getMidIx = (rightIdx, leftIdx) => {
    const idxRange = rightIdx - leftIdx;
    const midIdx = leftIdx + Math.floor(idxRange / 2);

    return midIdx;
};

const getTargetIndex = (nums, target) => {
    let leftIdx = 0;
    let rightIdx = nums.length - 1;

    while (leftIdx <= rightIdx) {
        const midIdx = getMidIx(rightIdx, leftIdx);
        const midValue = nums[midIdx];

        if (midValue === target) return midIdx;
        else if (midValue < target) leftIdx = midIdx + 1;
        else if (midValue > target) rightIdx = midIdx - 1;
    }

    return NOT_FOUND;
};

// const nums = [-1, 0, 3, 5, 9, 12];
// const target = 9;

// console.log(`Your answer: ${getTargetIndex(nums, target)}`);
// console.log(`Correct answer: ${4}`);

// const nums = [-1, 0, 3, 5, 9, 12];
// const target = 2;

// console.log(`Your answer: ${getTargetIndex(nums, target)}`);
// console.log(`Correct answer: ${-1}`);

const nums = [5];
const target = 5;

console.log(`Your answer: ${getTargetIndex(nums, target)}`);
console.log(`Correct answer: ${0}`);
