/*
The colors of the rainbow are specified by the acronym "ROYGBIV" - red, orange, yellow, green, blue, indigo, violet (order matters here). 
You want to find the length of the shortest sequence of characters in a matrix that creates the acronym "ROYGBIV".

You'll be given a matrix that only consists of the strings "R", "O", "Y", "G", "B", "I", and "V". 
From each position, you can go up, down, left, or right to find another character. 
To find a rainbow, you must start at "R", end at "Y", and each intermediate cell should be the next character in "ROYGBIV". 
For example, "R" => "O" => "Y" => "G" => "B" => "I" => "V" is a valid rainbow.

Additionally, it is okay to use the have the same character more than once as long as it is done consecutively. 
For example, this is also a valid rainbow: "R" => "R" => "R" => "O" => "Y" => "Y" => "G" => "B" => "I" => "V".

Given this matrix of colors, you should return the length of the shortest sequence that forms a rainbow.
*/

const { Queue } = require('./utils/queue');

const RAINBOW = 'ROYGBIV';
RAINBOW_NOT_FOUND = -1;

const directions = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
];

const getRowColString = (row, col) => `${row}, ${col}`;

const isInBound = (row, col, grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const isInRowBound = row >= 0 && row < numRows;
    const isInColBound = col >= 0 && row < numCols;

    return isInRowBound && isInColBound;
};

const getNeighbors = (row, col, sequenceSoFar, colorIndex, grid, rainbowString) => {
    const neighbors = [];

    for (const direction of directions) {
        const [rowDir, colDir] = direction;

        const newRow = row + rowDir;
        const newCol = col + colDir;

        if (!isInBound(newRow, newCol, grid)) continue;

        const newColorInGrid = grid[newRow][newCol];

        const currColorInColors = rainbowString[colorIndex];
        const nextColorInColors = rainbowString[colorIndex + 1];

        if (newColorInGrid !== currColorInColors && newColorInGrid !== nextColorInColors) continue;

        if (newColorInGrid === nextColorInColors) colorIndex++;

        const neighbor = {
            row: newRow,
            col: newCol,
            sequenceSoFar: sequenceSoFar + 1,
            colorIndex: colorIndex,
        };

        neighbors.push(neighbor);
    }

    return neighbors;
};

const getShortestSequence = (startRow, startCol, grid, rainbowString) => {
    const queue = new Queue();
    const visited = new Set();

    visited.add(getRowColString(startRow, startCol));

    queue.enqueue({
        row: startRow,
        col: startCol,
        sequenceSoFar: 1,
        colorIndex: 0,
    });

    while (queue.size() > 0) {
        // Remove node
        const { row, col, sequenceSoFar, colorIndex } = queue.dequeue();

        // Process node
        const lastColorsIndex = rainbowString.length - 1;
        const lastColor = rainbowString[lastColorsIndex];

        if (grid[row][col] === lastColor) return sequenceSoFar;

        // Get neighbors
        const neighbors = getNeighbors(row, col, sequenceSoFar, colorIndex, grid, rainbowString);
        for (const neighbor of neighbors) {
            const { row, col } = neighbor;

            if (visited.has(getRowColString(row, col))) continue;

            visited.add(getRowColString(row, col));
            queue.enqueue(neighbor);
        }
    }

    return RAINBOW_NOT_FOUND;
};

const findShortestRainbowLength = (colors) => {
    const numRow = colors.length;
    const numCol = colors[0].length;
    let shorestSequence = Infinity;

    for (let row = 0; row < numRow; row++) {
        for (let col = 0; col < numCol; col++) {
            const color = colors[row][col];

            if (color !== RAINBOW[0]) continue;
            const currShortestSequence = getShortestSequence(row, col, colors, RAINBOW);

            if (currShortestSequence === RAINBOW_NOT_FOUND) continue;

            shorestSequence = Math.min(shorestSequence, currShortestSequence);
        }
    }

    return shorestSequence;
};

const colors = [
    ['R', 'O', 'V', 'V', 'I'],
    ['B', 'I', 'B', 'G', 'Y'],
    ['Y', 'V', 'R', 'O', 'Y'],
    ['B', 'G', 'R', 'Y', 'R'],
];

console.log(`Your answer: ${findShortestRainbowLength(colors)}`);
console.log(`Correct answer: ${8}`);
console.log();
