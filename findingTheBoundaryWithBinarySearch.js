/*
As similar to the previous problem, we're going to approach this problem using a binary search algorithm and 
divide a porition of the list in half, until we've narrow down the location of the target.

Since we're trying to find the first sign of the true boolean, we're going to set two pointers. One pointer
will be at the start and the other at the end. If a left pointer reaches a false boolean, we'll
know our target is more to the right. If a right pointer reaches a true boolean, there's a
possibilty that it's not the earlist one, so we'll continue searching one until we 
reach a true boolean next to a false one and then return the current index of the
true boolean.
*/

/*
Question:
An array of boolean values is divided into two sections; the left section 
consists of all false and the right section consists of all true. Find the 
First True in a Sorted Boolean Array of the right section, i.e. the index 
of the first true element. If there is no true element, return -1.
*/

// TODO: write your code here

const NOT_FOUND = 1;

const getMidIdx = (leftIdx, rightIdx) => {
    const idxRange = rightIdx - leftIdx;
    const midIdx = leftIdx + Math.floor(idxRange / 2);

    return midIdx;
};

const findBoundary = (booleans) => {
    let leftIdx = 0;
    let rightIdx = booleans.length - 1;

    let boundaryIdx = NOT_FOUND;

    while (leftIdx <= rightIdx) {
        const midIdx = getMidIdx(leftIdx, rightIdx);
        console.log(midIdx);
        const midBoolean = booleans[midIdx];

        if (midBoolean) {
            boundaryIdx = midIdx;
            rightIdx = midIdx - 1;
        } else {
            leftIdx = midIdx + 1;
        }
    }
    return boundaryIdx;
};

const booleans = [false, false, true, true, true];

// 0 4
// 2 = true
// 0 3
// 1 = false
// 1 3
// 2 = true
// 1 2
// 1 = false
// 2 2
// 2 = true
// 2 1
// Break

console.log(`Your answer: ${findBoundary(booleans)}`);
console.log(`Correct answer: ${2}`);
console.log();
