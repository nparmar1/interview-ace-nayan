/*
We're going to approach this problem with a multi-source BFS. The grid will contain
two islands, so we can first gather all the locations of the first island only.

Once we have the locations of the first island, we can perform our BFS by adding 
them to the queue with a starting path of 0. Since we're trying to find the shortest path 
that connects with second island, starting with a path of 0 for all locations will be ideal 
because with a BFS, you will always have the shorest path if you're visiting a 
location for the first time.

Once we reach a part of the second island, we will return the current path.
We will keep track of off all visited locations with a visited set and only update
our path if it's the very first time visiting that location.
*/

/*
Question:
You are given an n x n binary matrix grid where 1 represents land and 0 represents water.

An island is a 4-directionally connected group of 1's not connected to any other 1's. There are exactly two islands in grid.

You may change 0's to 1's to connect the two islands to form one island.

Return the smallest number of 0's you must flip to connect the two islands.
*/

const { Queue } = require('../../../utils/queue');

const LAND = 1;

const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

// 0 1 0
// 0 0 0
// 0 0 1

const isBound = (row, col, grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const isRowBound = row >= 0 && row < numRows;
    const isColBound = col >= 0 && col < numCols;

    return isRowBound && isColBound;
};

const getRowColString = ({ row, col }) => `${row}, ${col}`;

const getChildren = (row, col, grid) => {
    const children = [];

    for (const direction of directions) {
        const [rowDir, colDir] = direction;

        const newRow = row + rowDir;
        const newCol = col + colDir;

        if (!isBound(newRow, newCol, grid)) continue;

        children.push({ row: newRow, col: newCol });
    }

    return children;
};

const findFirstIslandCoordinates = (startRow, startCol, grid) => {
    const visited = new Set();
    const queue = new Queue();

    const rowColString = getRowColString({ row: startRow, col: startCol });
    visited.add(rowColString);

    queue.enqueue({ row: startRow, col: startCol });

    const firstIslandCoordinates = [];
    while (queue.size() > 0) {
        // Remove node
        const { row, col } = queue.dequeue();

        // Process node
        if (grid[row][col] !== LAND) continue;
        firstIslandCoordinates.push({ row, col });

        // Get children
        const children = getChildren(row, col, grid);
        for (const child of children) {
            const rowColString = getRowColString(child);
            if (visited.has(rowColString)) continue;
            visited.add(rowColString);

            queue.enqueue({ ...child });
        }
    }

    return firstIslandCoordinates;
};

const getFirstIslandCoordinates = (grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    let firstIslandCoordinates = null;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (grid[row][col] !== LAND) continue;

            firstIslandCoordinates = findFirstIslandCoordinates(row, col, grid);

            return firstIslandCoordinates;
        }
    }
};

const getShortestBridge = (grid, firstIslandCoordinates) => {
    const visited = new Set();
    const queue = new Queue();

    for (const firstIslandCoordinate of firstIslandCoordinates) {
        visited.add(getRowColString(firstIslandCoordinate));
        queue.enqueue({ ...firstIslandCoordinate, path: 0 });
    }

    while (queue.size() > 0) {
        // Remove node
        const { row, col, path } = queue.dequeue();

        // Process node
        const isIslandVisited = visited.has(getRowColString({ row, col }));
        const terrain = grid[row][col];

        if (!isIslandVisited && terrain === LAND) {
            const bridgeNum = path - 1;
            return bridgeNum;
        }

        visited.add({ row, col });

        // Get children
        const children = getChildren(row, col, grid);
        for (const child of children) {
            const rowColString = getRowColString(child);
            if (visited.has(rowColString)) continue;

            queue.enqueue({ ...child, path: path + 1 });
        }
    }
};

const getBestBridge = (grid) => {
    const firstIslandCoordinates = getFirstIslandCoordinates(grid);

    return getShortestBridge(grid, firstIslandCoordinates);
};

let grid = [
    [0, 1],
    [1, 0],
];

console.log(`Your answer: ${getBestBridge(grid)}`);
console.log(`Correct answer: ${1}`);

grid = [
    [0, 1, 0],
    [0, 0, 0],
    [0, 0, 1],
];

console.log(`Your answer: ${getBestBridge(grid)}`);
console.log(`Correct answer: ${2}`);

grid = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
];

console.log(`Your answer: ${getBestBridge(grid)}`);
console.log(`Correct answer: ${1}`);
