/*
In an infinite chess board with coordinates from -infinity to +infinity, you have a knight at square [0, 0].

A knight has 8 possible moves it can make, as illustrated below. Each move is two squares in a cardinal direction, then one square in an orthogonal direction.

Return the minimum number of steps needed to move the knight to the square [x, y]. It is guaranteed the answer exists.
*/

const { Queue } = require('./utils/queue');

const directions = [
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
];

const getNeighbors = (currentRow, currentCol) => {
    const neighbors = []; // [1, 2], [2, 1]

    for (const direction of directions) {
        const [rowDir, colDir] = direction;

        const newRow = currentRow + rowDir;
        const newCol = currentCol + colDir;

        neighbors.push({ row: newRow, col: newCol });
    }

    return neighbors;
};

const getCoordString = (coordinates) => {
    const { row, col } = coordinates;

    return `${row}, ${col}`;
};

const getMinKnightMoves = (targetRow, targetCol) => {
    const queue = new Queue();
    const visited = new Set();

    const initialCoordDistance = { row: 0, col: 0, distanceFromStart: 0 };
    const initialCoordDistanceString = getCoordString({ row: 0, col: 0 });

    visited.add(initialCoordDistanceString);
    queue.enqueue(initialCoordDistance);

    while (queue.size() > 0) {
        const { row, col, distanceFromStart } = queue.dequeue();

        // Process node
        if (row === targetRow && col === targetCol) return distanceFromStart;

        const neighbors = getNeighbors(row, col);
        for (const neighbor of neighbors) {
            const coordDistanceString = getCoordString(neighbor);
            if (visited.has(coordDistanceString)) continue;

            visited.add(coordDistanceString);
            queue.enqueue({ ...neighbor, distanceFromStart: distanceFromStart + 1 });
        }
    }
};

const x = 5;
const y = 5;

console.log(`Your answer: ${getMinKnightMoves(x, y)}`);
console.log(`Correct answer: ${4}`);

// Explanation: [0, 0] → [2, 1] → [4, 2] → [3, 4] → [5, 5]
