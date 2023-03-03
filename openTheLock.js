/*
You have a lock in front of you with 4 circular wheels. 
Each wheel has 10 slots: '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'. 
The wheels can rotate freely and wrap around: for example we can turn '9' to be '0', or '0' to be '9'. 
Each move consists of turning one wheel one slot.

The lock initially starts at '0000', a string representing the state of the 4 wheels.

You are given a list of deadends dead ends, meaning if the lock displays any of these codes, 
the wheels of the lock will stop turning and you will be unable to open it.

Given a target representing the value of the wheels that will unlock the lock, 
return the minimum total number of turns required to open the lock, or -1 if it is impossible.
*/

const { Queue } = require('./utils/queue');

const START_COMBO = '0000';
const NINE_STRING = '9';
const ZERO_STRING = '0';
const IMPOSSIBLE_TO_TURN = -1;

const increaseCharUp = (char) => {
    if (char === NINE_STRING) return ZERO_STRING;

    const charAsNum = parseInt(char);
    const increaseCar = charAsNum + 1;
    const charAsString = increaseCar.toString();

    return charAsString;
};

const decreaseCharDown = (char) => {
    if (char === ZERO_STRING) return NINE_STRING;

    const charAsNum = parseInt(char);
    const decreaseChar = charAsNum - 1;
    const charAsString = decreaseChar.toString();

    return charAsString;
};

const replaceChar = (replacementChar, IDX, combo) => {
    const subStringBeforeI = combo.substring(0, IDX);
    const subStrigAfterI = combo.substring(IDX + 1);

    const updatedCombo = subStringBeforeI + replacementChar + subStrigAfterI;

    return updatedCombo;
};

const getNeighbors = (combo) => {
    const neighbors = [];
    const comboLength = combo.length;

    for (let i = 0; i < comboLength; i++) {
        const currChar = combo[i];
        const currIDX = i;

        const charUp = increaseCharUp(currChar);
        const charDown = decreaseCharDown(currChar);

        const upString = replaceChar(charUp, currIDX, combo);
        const downString = replaceChar(charDown, currIDX, combo);

        neighbors.push(upString, downString);
    }

    return neighbors;
};

const getMinTurns = (deadends, targetCombo, visitedCombo, deadendSet) => {
    const queue = new Queue();

    visitedCombo.add(START_COMBO);
    queue.enqueue({ combo: START_COMBO, turnsSoFar: 0 });

    while (queue.size() > 0) {
        // Remove node
        const { combo, turnsSoFar } = queue.dequeue();

        // Process node
        if (combo === targetCombo) return turnsSoFar;

        // Get neighbors
        const neighbors = getNeighbors(combo);
        for (const neighbor of neighbors) {
            if (visitedCombo.has(neighbor)) continue;
            if (deadendSet.has(neighbor)) continue;

            visitedCombo.add(neighbor);
            queue.enqueue({ combo: neighbor, turnsSoFar: turnsSoFar + 1 });
        }
    }

    return IMPOSSIBLE_TO_TURN;
};

const openLock = (deadends, targetCombo) => {
    const visitedCombo = new Set();
    const deadendSet = new Set(deadends);

    const containsStart = deadendSet.has(START_COMBO);
    const containsTarget = deadendSet.has(targetCombo);

    if (containsStart || containsTarget) return IMPOSSIBLE_TO_TURN;

    const minTurns = getMinTurns(deadends, targetCombo, visitedCombo, deadendSet);

    return minTurns;
};

const deadends = ['0201', '0101', '0102', '1212', '2002'];
const target = '0202';

console.log(`Your answer: ${openLock(deadends, target)}`);
console.log(`Correct answer: ${6}`);
