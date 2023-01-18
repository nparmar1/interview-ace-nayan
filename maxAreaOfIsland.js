/*
You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) 
You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.

Return the maximum area of an island in grid. If there is no island, return 0.
*/

//    0  1  2  3  4  5  6  7  8  9  10 11 12
// 0 [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
// 1 [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
// 2 [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
// 3 [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
// 4 [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
// 5 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
// 6 [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
// 7 [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],

const { Queue } = require('./utils/queue');

const directions = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
];

const ISLAND = 1;
const WATER = 0;

const getRowColString = (row, col) => `${row}, ${col}`;

const isWithinBounds = (newRow, newCol, grid) => {
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

        if (!isWithinBounds(newRow, newCol, grid)) continue;

        if (grid[newRow][newCol] === WATER) continue;

        potentialNeighbors.push([newRow, newCol]);
    }
    return potentialNeighbors;
};

const getIslandArea = (row, col, grid, visited) => {
    const queue = new Queue();
    const rowColString = getRowColString(row, col);

    visited.add(rowColString);
    queue.enqueue([row, col]);

    let getIslandArea = 0;
    while (queue.size() > 0) {
        const [row, col] = queue.dequeue();

        // Process node
        getIslandArea++;

        const neighbors = getNeighbors(row, col, grid);
        for (const neighbor of neighbors) {
            const [rowNeighbor, colNeighbor] = neighbor;

            const neighborRowColString = getRowColString(rowNeighbor, colNeighbor);
            if (visited.has(neighborRowColString)) continue;

            if (visited.add(neighborRowColString));
            queue.enqueue([rowNeighbor, colNeighbor]);
        }
    }
    return getIslandArea;
};

const getMaxAreaOfIsland = (grid) => {
    if (grid.length === 0) return 0;
    const visited = new Set();
    let maxIslandArea = 0;

    const numRows = grid.length;
    const numCols = grid[0].length;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const isIsland = grid[row][col] === ISLAND;
            if (!isIsland) continue;

            const rowColString = getRowColString(row, col);
            if (visited.has(rowColString)) continue;

            const curIslandArea = getIslandArea(row, col, grid, visited);
            if (curIslandArea > maxIslandArea) maxIslandArea = curIslandArea;
        }
    }

    return maxIslandArea;
};

const grid = [
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
];

console.log(`Your answer: ${getMaxAreaOfIsland(grid)}`);
console.log(`Correct answer: ${6}`);
