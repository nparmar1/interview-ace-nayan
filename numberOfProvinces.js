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

const { Queue } = require('../utils/queue');

const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

const CONNECTED = 1;

const getRowColString = (row, col) => `${row}, ${col}`;

const isBound = (row, col, matrix) => {
    const rowBound = matrix.length;
    const colBound = matrix[0].length;

    const isRowBound = row >= 0 && row < rowBound;
    const isColBound = col >= 0 && col < colBound;

    return isRowBound && isColBound;
};

const getChildren = (row, col, matrix) => {
    const children = [];

    for (const direction of directions) {
        const [rowDir, colDir] = direction;

        const newRow = row + rowDir;
        const newCol = col + colDir;

        const isInBound = isBound(newRow, newCol, matrix);
        if (!isInBound) continue;
        if (matrix[newRow][newCol] !== CONNECTED) continue;

        children.push([row, col]);
    }

    return children;
};

const markedVisited = (row, col, visited, matrix) => {
    const queue = new Queue();
    queue.enqueue([row, col]);

    while (queue.size() > 0) {
        // Remove row, col
        const [row, col] = queue.dequeue();

        // Process node

        // Get children
        const children = getChildren(row, col, matrix);
        for (const child of children) {
            const [rowChild, colChild] = child;

            const childRowColString = getRowColString(rowChild, colChild);
            if (visited.has(childRowColString)) continue;

            visited.add(childRowColString);
            queue.enqueue([rowChild, colChild]);
        }
    }
};


const numberOfProvinces = (matrix) => {
    const visited = new Set();
    let provincesNumber = 0;

    const rows = matrix.length;
    const cols = matrix[0].length;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const rowColString = getRowColString(row, col);
            if (visited.has(rowColString)) continue;

            provincesNumber++;
            visited.add(rowColString);
            markedVisited(row, col, visited, matrix);
        }
    }
    return provincesNumber;
};

const isConnected = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
];
console.log(`Your answer: ${numberOfProvinces(isConnected)}`);
console.log(`Correct answer: ${2}`);
