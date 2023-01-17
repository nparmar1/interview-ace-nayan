/*
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. 
You may assume all four edges of the grid are all surrounded by water.
*/

//     0    1    2    3    4
// 0 ['1', '1', '0', '0', '0'],
// 1 ['1', '1', '0', '0', '0'],
// 2 ['0', '0', '1', '0', '0'],
// 3 ['0', '0', '0', '1', '1'],

const { Queue } = require('./utils/queue');

const WATER = '0';

const directions = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
];

const getRowColString = (row, col) => `${row}, ${col}`;

const isBound = (row, col, grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const isInRowBound = row >= 0 && row < numRows;
    const isInColBound = col >= 0 && col < numCols;

    return isInRowBound && isInColBound;
};

const getNeighbors = (row, col, grid) => {
    const potentialNeighbors = [];

    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        if (!isBound(newRow, newCol, grid)) continue;
        if (grid[newRow][newCol] === WATER) continue;

        potentialNeighbors.push([newRow, newCol]);
    }

    return potentialNeighbors;
};

const markAsVisited = (row, col, grid, visited) => {
    const queue = new Queue();
    const rowColString = getRowColString(row, col);

    visited.add(rowColString);
    queue.enqueue([row, col]);

    while (queue.size() > 0) {
        const [row, col] = queue.dequeue();

        // Process node

        const neighbors = getNeighbors(row, col, grid);
        for (const neighbor of neighbors) {
            const [neighborRow, neighborCol] = neighbor;
            const neighborRowColString = getRowColString(neighborRow, neighborCol);

            if (visited.has(neighborRowColString)) continue;

            visited.add(neighborRowColString);
            queue.enqueue([neighborRow, neighborCol]);
        }
    }
};

const getNumIslands = (grid) => {
    const visited = new Set();
    let numberOfIslands = 0;

    const numRows = grid.length;
    const numCols = grid[0].length;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const rowColString = getRowColString(row, col);
            const isWater = grid[row][col] === WATER;

            if (visited.has(rowColString)) continue;
            if (isWater) continue;

            numberOfIslands++;
            markAsVisited(row, col, grid, visited);
        }
    }

    return numberOfIslands;
};

const grid = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1'],
];
console.log(`Your answer: ${getNumIslands(grid)}`);
console.log(`Correct answer: ${3}`);
