/*
We're going to approach this problem with a multi-source BFS where can gather the location of a
rotten orange, set it with a starting time of 0, and add it to the queue. We can also gather the total
number of fresh oranges in the grid and keep track of them as we traverse/BFS-ing.

Once in the queue, we can traverse the grid, perform a BFS until we find a fresh orange
and update the current time so far but only if it's the first time visiting that fresh orange. We will
use a visited set to keep track of all the fresh oranges visited.

As we're BFS-ing the grid, we can keep track of the number of fresh oranges and decrese it by 1 if it's
our first time visiting that fresh orange. Once we reach 0 fresh oranges, we can return the current time.
*/

/*
Question:
You are given an m x n grid where each cell can have one of three values:

0 representing an empty cell,
1 representing a fresh orange, or
2 representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.
*/

const { Queue } = require('../../../utils/queue');

const directions = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
];

const FRESH_ORANGE = 1;
const ROTTEN_ORANGE = 2;
const EMPTY_CELL = 0;
const IMPOSSIBLE = -1;

const getRowColString = ({ row, col }) => `${row}, ${col}`;

const getNumFreshOranges = (grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    let numFreshOranges = 0;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (grid[row][col] === FRESH_ORANGE) numFreshOranges++;
        }
    }

    return numFreshOranges;
};

const getRottenOrangesLocation = (grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const locations = [];

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (grid[row][col] === ROTTEN_ORANGE) locations.push({ row, col });
        }
    }

    return locations;
};

const isInBound = (row, col, grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const isRowBound = row >= 0 && row < numRows;
    const isColBound = col >= 0 && col < numCols;

    return isRowBound && isColBound;
};

const getChildren = (row, col, grid) => {
    const children = [];

    for (const direction of directions) {
        const [rowDir, colDir] = direction;

        const newRow = row + rowDir;
        const newCol = col + colDir;

        if (
            !isInBound(newRow, newCol, grid) ||
            grid[newRow][newCol] === ROTTEN_ORANGE ||
            grid[newRow][newCol] === EMPTY_CELL
        )
            continue;

        children.push({ row: newRow, col: newCol });
    }
    return children;
};

const getMinimumMins = (grid) => {
    const visited = new Set();
    const queue = new Queue();

    let numFreshOranges = getNumFreshOranges(grid);
    const rottenOrangesLocations = getRottenOrangesLocation(grid);

    if (numFreshOranges === 0) return 0;
    if (rottenOrangesLocations.length === 0) return IMPOSSIBLE;

    for (const rottenOrangesLocation of rottenOrangesLocations) {
        visited.add(getRowColString(rottenOrangesLocations));
        queue.enqueue({ ...rottenOrangesLocation, minsToRotFreshOrange: 0 });
    }

    while (queue.size() > 0) {
        // Remove row, col, mins
        const { row, col, minsToRotFreshOrange } = queue.dequeue();

        // Process row, col, mins
        if (grid[row][col] === FRESH_ORANGE) {
            grid[row][col] = ROTTEN_ORANGE;
            numFreshOranges--;
        }

        if (numFreshOranges === 0) return minsToRotFreshOrange;

        // Get children
        const children = getChildren(row, col, grid);
        for (const child of children) {
            if (visited.has(getRowColString(child))) continue;

            visited.add(getRowColString(child));
            queue.enqueue({ ...child, minsToRotFreshOrange: minsToRotFreshOrange + 1 });
        }
    }

    return IMPOSSIBLE;
};

const grid = [
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1],
];

console.log(`Your answer: ${getMinimumMins(grid)}`);
console.log(`Correct answer: ${4}`);
