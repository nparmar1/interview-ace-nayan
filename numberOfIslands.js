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

const isInBound = (row, col, grid) => {
    const rowBoundLength = grid.length;
    const colBoundLength = grid[0].length;

    const isInRowBound = row >= 0 && row < rowBoundLength;
    const isInColBound = col >= 0 && col < colBoundLength;

    return isInRowBound && isInColBound;
};

const getChildren = (row, col, grid) => {
    const children = [];

    for (const direction of directions) {
        const [rowDir, colDir] = direction;

        const newRow = row + rowDir;
        const newCol = col + colDir;

        const isBound = isInBound(newRow, newCol, grid);

        if (!isBound) continue;
        if (grid[newRow][newCol] === WATER) continue;

        children.push([newRow, newCol]);
    }

    return children;
};

const markAsVisited = (row, col, grid, visited) => {
    const queue = new Queue();
    const rowColString = getRowColString(row, col);

    visited.add(rowColString);
    queue.enqueue([row, col]);

    while (queue.size() > 0) {
        const [row, col] = queue.dequeue();

        // Process node

        const children = getChildren(row, col, grid);
        for (const child of children) {
            const [rowChild, rowCol] = child;
            const childRowColString = getRowColString(rowChild, rowCol);

            if (visited.has(childRowColString)) continue;

            visited.add(childRowColString);
            queue.enqueue([rowChild, rowCol]);
        }
    }
};

const getNumIslands = (grid) => {
    const visited = new Set();
    let numberOfIslands = 0;

    const rowLength = grid.length;
    const colLength = grid[0].length;

    for (let row = 0; row < rowLength; row++) {
        for (let col = 0; col < colLength; col++) {
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
