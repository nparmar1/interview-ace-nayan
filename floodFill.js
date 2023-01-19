/*
An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.

You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc].

To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, 
plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with color.

Return the modified image after performing the flood fill.
*/

const { Queue } = require('./utils/queue');

const directions = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
];

const isInBound = (grid, row, col) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const isInRowBound = row >= 0 && row < numRows;
    const isInColBound = col >= 0 && col < numCols;

    return isInRowBound && isInColBound;
};

const getNeighbors = (grid, row, col, colorToReplace) => {
    const potentialNeighbors = [];

    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        if (!isInBound(grid, newRow, newCol)) continue;
        if (grid[newRow][newCol] !== colorToReplace) continue;

        potentialNeighbors.push([newRow, newCol]);
    }

    return potentialNeighbors;
};

const getRowColString = (row, col) => `${row}, ${col}`;

const getFloodFillImage = (image, startRow, startCol, replacementColor) => {
    const queue = new Queue();
    const visited = new Set();
    const startColor = image[startRow][startCol];

    const startRowColString = getRowColString(startRow, startCol);
    visited.add(startRowColString);

    queue.enqueue([startRow, startCol]);

    while (queue.size() > 0) {
        const [row, col] = queue.dequeue();

        // Process node]
        image[row][col] = replacementColor;

        const neighbors = getNeighbors(image, row, col, startColor);
        for (const neighbor of neighbors) {
            const [neighborRow, neighborCol] = neighbor;

            const neighborRowColString = getRowColString(neighborRow, neighborCol);
            if (visited.has(neighborRowColString)) continue;

            visited.add(neighborRowColString);
            queue.enqueue([neighborRow, neighborCol]);
        }
    }

    return image;
};

const image = [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1],
];
const sr = 1;
const sc = 1;
const color = 2;

console.log(`Your answer: ${getFloodFillImage(image, sr, sc, color)}`);
console.log(
    `Correct answer: ${[
        [
            [
                [2, 2, 2],
                [2, 2, 0],
                [2, 0, 1],
            ],
        ],
    ]}`,
);
