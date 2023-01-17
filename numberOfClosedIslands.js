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

const isBound = (newRow, newCol, grid) => {
    const numRow = grid.length;
    const numCol = grid[0].length;

    const isRowInBound = newRow >= 0 && newRow < numRow;
    const isColInBound = newCol >= 0 && newCol < numCol;

    return isRowInBound && isColInBound;
};

const getNeighbors = (row, col, grid) => {
    const potentialNeighbors = [];

    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        potentialNeighbors.push([newRow, newCol]);
    }
    return potentialNeighbors;
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
        if (!isBound(row, col, grid)) {
            isClosedIsland = false;
            continue;
        }

        if (grid[row][col] === WATER) continue;

        const neighbors = getNeighbors(row, col, grid);
        for (const neighbor of neighbors) {
            const [rowNeighbor, colNeighbor] = neighbor;

            const neighborRowColString = getRowColString(rowNeighbor, colNeighbor);
            if (visited.has(neighborRowColString)) continue;

            if (visited.add(neighborRowColString));
            queue.enqueue([rowNeighbor, colNeighbor]);
        }
    }

    return isClosedIsland;
};

const getNumberOfclosedIslands = (grid) => {
    const visited = new Set();
    let numberOfClosedIslands = 0;

    const numRow = grid.length;
    const numCol = grid[0].length;

    for (let row = 0; row < numRow; row++) {
        for (let col = 0; col < numCol; col++) {
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
