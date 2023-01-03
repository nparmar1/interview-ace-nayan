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

const isInBoundWithGrid = (grid, newRow, newCol) => {
    const rowBoundLength = grid.length;
    const colBoundLength = grid[0].length;

    const isInRowBound = newRow >= 0 && newRow < rowBoundLength;
    const isInColBound = newCol >= 0 && newCol < colBoundLength;

    return isInRowBound && isInColBound;
};

const getChildren = (grid, row, col, startColor) => {
    const children = [];

    for (const direction of directions) {
        const [rowDir, ColDir] = direction;

        const newRow = row + rowDir;
        const newCol = col + ColDir;

        const isInBound = isInBoundWithGrid(grid, newRow, newCol);

        if (!isInBound) continue;
        if (grid[newRow][newCol] !== startColor) continue;

        children.push([newRow, newCol]);
    }

    return children;
};

const getRowColString = (row, col) => `${row}, ${col}`;

const getFloodFillImage = (image, startRow, startCol, color) => {
    const queue = new Queue();
    const visited = new Set();
    const startColor = image[startRow][startCol];

    const startRowColString = getRowColString(startRow, startCol);
    visited.add(startRowColString);

    queue.enqueue([startRow, startCol]);

    while (queue.size() > 0) {
        const [row, col] = queue.dequeue();

        // Process node]
        image[row][col] = color;

        const children = getChildren(image, row, col, startColor);
        for (const child of children) {
            const [childRow, childCol] = child;

            const childRowColString = getRowColString(childRow, childCol);
            if (visited.has(childRowColString)) continue;

            visited.add(childRowColString);
            queue.enqueue([childRow, childCol]);
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
