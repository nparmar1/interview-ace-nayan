/*
n cities

a - b - c

i: n x n matrix
o: total number of provinces

directly or indirectly

Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2

   0 1 2
0 [1,1,0],
1 [1,1,0],
2 [0,0,1]

*/

const { Queue } = require('./utils/queue');

const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

const CONNECTED = 1;

const getRowColString = (row, col) => `${row}, ${col}`;

const isInBounds = (row, col, adjacencyMatrix) => {
    const numRows = adjacencyMatrix.length;
    const numCols = adjacencyMatrix[0].length;

    const isInRowBound = row >= 0 && row < numRows;
    const isInColBound = col >= 0 && col < numCols;

    return isInRowBound && isInColBound;
};

const getNeighbors = (row, col, adjacencyMatrix) => {
    const neighbors = [];

    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        const isInBound = isInBounds(newRow, newCol, adjacencyMatrix);
        if (!isInBound) continue;
        if (adjacencyMatrix[newRow][newCol] !== CONNECTED) continue;

        neighbors.push([row, col]);
    }

    return neighbors;
};

const markComponentAsVisited = (row, col, visited, adjacencyMatrix) => {
    const queue = new Queue();
    const rowColString = getRowColString(row, col);
    visited.add(rowColString);

    queue.enqueue([row, col]);

    while (queue.size() > 0) {
        // Remove row, col
        const [row, col] = queue.dequeue();

        // Process node

        // Get children
        const neighbors = getNeighbors(row, col, adjacencyMatrix);
        for (const neighbor of neighbors) {
            const [rowNeighbor, colNeighbors] = neighbor;

            const neighborRowColString = getRowColString(rowNeighbor, colNeighbors);
            if (visited.has(neighborRowColString)) continue;

            visited.add(neighborRowColString);
            queue.enqueue([rowNeighbor, colNeighbors]);
        }
    }
};

const numberOfProvinces = (adjacencyMatrix) => {
    const visited = new Set();
    let numProvinces = 0;

    const numRows = adjacencyMatrix.length;
    const numCols = adjacencyMatrix[0].length;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const rowColString = getRowColString(row, col);
            if (visited.has(rowColString)) continue;

            numProvinces++;
            markComponentAsVisited(row, col, visited, adjacencyMatrix);
        }
    }
    return numProvinces;
};

const isConnected = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
];
console.log(`Your answer: ${numberOfProvinces(isConnected)}`);
console.log(`Correct answer: ${2}`);
