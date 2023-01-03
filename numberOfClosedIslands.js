/*
Given a 2D grid consists of 0s (land) and 1s (water). 
An island is a maximal 4-directionally connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.

Return the number of closed islands.
*/

//    0  1  2  3  4  5  6  7
// 0 [1, 1, 1, 1, 1, 1, 1, 0],
// 1 [1, 0, 0, 0, 0, 1, 1, 0],
// 2 [1, 0, 1, 0, 1, 1, 1, 0],
// 3 [1, 0, 0, 0, 0, 1, 0, 1],
// 4 [1, 1, 1, 1, 1, 1, 1, 0],

const { Queue } = require('./utils/queue');

const directions = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
];

const WATER = 1;

const getRowColString = (row, col) => `${row}, ${col}`;

const isInBound = (newRow, newCol, grid) => {
    const rowBoundLength = grid.length;
    const colBoundLength = grid[0].length;

    const isRowInBound = newRow >= 0 && newRow < rowBoundLength;
    const isColInBound = newCol >= 0 && newCol < colBoundLength;

    return isRowInBound && isColInBound;
};

const getChildren = (row, col, grid) => {
    const children = [];

    for (const direction of directions) {
        const [rowDir, colDir] = direction;

        const newRow = row + rowDir;
        const newCol = col + colDir;

        children.push([newRow, newCol]);
    }

    return children;
};

const getClosedIsland = (row, col, grid, visited) => {
    const queue = new Queue();

    const rowColString = getRowColString(row, col);
    visited.add(rowColString);

    queue.enqueue([row, col]);

    let isClosedIsland = true;
    while (queue.size() > 0) {
        const [row, col] = queue.dequeue();

        // Process node
        const isBound = isInBound(row, col, grid);
        if (!isBound) {
            isClosedIsland = false;
            continue;
        }

        if (grid[row][col] === WATER) continue;

        const children = getChildren(row, col, grid);
        for (const child of children) {
            const [rowChild, colChild] = child;

            const childRowColString = getRowColString(rowChild, colChild);
            if (visited.has(childRowColString)) continue;

            visited.add(childRowColString);
            queue.enqueue([rowChild, colChild]);
        }
    }

    return isClosedIsland;
};

const getNumberOfclosedIslands = (grid) => {
    const visited = new Set();
    let numberOfClosedIslands = 0;

    const rowLength = grid.length;
    const colLength = grid[0].length;

    for (let row = 0; row < rowLength; row++) {
        for (let col = 0; col < colLength; col++) {
            const isWater = grid[row][col] === WATER;
            if (isWater) continue;

            const rowColString = getRowColString(row, col);
            if (visited.has(rowColString)) continue;

            const isClosedIsland = getClosedIsland(row, col, grid, visited);
            if (isClosedIsland) numberOfClosedIslands++;
        }
    }

    return numberOfClosedIslands;
};

const grid = [
    [1, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 1, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0],
];

console.log(`Your answer: ${getNumberOfclosedIslands(grid)}`);
console.log(`Correct answer: ${2}`);
