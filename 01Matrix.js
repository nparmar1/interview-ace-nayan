/* 
Multi-sourced BFS solution, passes on LeetCode 

Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.
The distance between two adjacent cells is 1.
*/

const { Queue } = require('../../../utils/queue');
const ZERO = 0;

const directions = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
];

const isBound = (matrix, row, col) => {
    const rowBound = matrix.length;
    const colBound = matrix[0].length;

    const isRowBound = row >= 0 && row < rowBound;
    const isColBound = col >= 0 && col < colBound;

    return isRowBound && isColBound;
};

const getChildren = (matrix, row, col) => {
    const children = [];

    for (const direction of directions) {
        const [rowDir, colDir] = direction;

        const newRowDir = row + rowDir;
        const newColDir = col + colDir;

        if (!isBound(matrix, newRowDir, newColDir)) continue;
        if (matrix[newRowDir][newColDir] !== ZERO) continue;

        children.push({ row: newRowDir, col: newColDir });
    }

    return children;
};

const getRowColString = (row, col) => {
    return `${row}, ${col}`;
};

const getDistanceFromZero = (matrix) => {
    if (matrix.length === 0) return [];

    const queue = new Queue();
    const visted = new Set();

    const initialRow = 0;
    const initialCol = 0;

    const initialRowColString = getRowColString(initialRow, initialCol);
    visted.add(initialRowColString);

    queue.enqueue({ row: initialRow, col: initialCol, pathSoFar: 0 });

    while (queue.size() > 0) {
        // Pull node from queue
        const { row, col, pathSoFar } = queue.dequeue();

        // Process node
        matrix[row][col] = pathSoFar;

        // Get children, add to queue
        const children = getChildren(matrix, row, col);
        for (const child of children) {
            const { row, col } = child;

            const childRowColString = getRowColString(row, col);
            if (visted.has(childRowColString)) continue;

            visted.add(childRowColString);
            queue.enqueue({ row: row, col: col, pathSoFar: pathSoFar + 1 });
        }
    }

    return matrix;
};

const matrix = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
];

console.log(`Your answer: ${getDistanceFromZero(matrix)}`);
console.log(
    `Correct answer: ${[
        [0, 0, 0],
        [0, 1, 0],
        [1, 2, 1],
    ]}`,
);
