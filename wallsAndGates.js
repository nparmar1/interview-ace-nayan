/*
You are given an m x n grid rooms initialized with these three possible values.

- -1 A wall or an obstacle.
- 0 A gate.
- INF Infinity means an empty room. We use the value 2^31 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.

Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.
*/

const { Queue } = require('./utils/queue');

const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

const GATE = 0;
const WALL = -1;

const isInBound = (matrix, row, col) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    const isInRowBound = row >= 0 && row < numRows;
    const isInColBound = col >= 0 && col < numCols;

    return isInRowBound && isInColBound;
};

const getNeighbors = (matrix, row, col) => {
    const neighbors = [];

    for (const direction of directions) {
        const [rowDir, colDir] = direction;

        const newRow = row + rowDir;
        const newCol = col + colDir;

        if (!isInBound(matrix, newRow, newCol) || matrix[newRow][newCol] === WALL) continue;

        neighbors.push({ row: newRow, col: newCol });
    }

    return neighbors;
};

const getGateLocationString = (gateLocation) => {
    const { row, col } = gateLocation;

    return `${row}, ${col}`;
};

const getGateLocations = (matrix) => {
    const array = [];

    const numRows = matrix.length;
    const numCols = matrix[0].length;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (matrix[row][col] === GATE) {
                array.push({ row, col });
            }
        }
    }

    return array;
};

const getDistanceToNearestGate = (rooms) => {
    const queue = new Queue();
    const visited = new Set();

    const gateLocations = getGateLocations(rooms);

    for (const gateLocation of gateLocations) {
        const gateLocationString = getGateLocationString(gateLocation);

        visited.add(gateLocationString);

        queue.enqueue({ ...gateLocation, distanceFromGrate: 0 });
    }

    while (queue.size() > 0) {
        const { row, col, distanceFromGrate } = queue.dequeue();

        // Process node
        rooms[row][col] = distanceFromGrate;

        const neighbors = getNeighbors(rooms, row, col);
        for (const neighbor of neighbors) {
            const neighborLocationsString = getGateLocationString(neighbor);

            if (visited.has(neighborLocationsString)) continue;
            visited.add(neighborLocationsString);

            queue.enqueue({ ...neighbor, distanceFromGrate: distanceFromGrate + 1 });
        }
    }

    return rooms;
};

const rooms = [
    [2147483647, -1, 0, 2147483647],
    [2147483647, 2147483647, 2147483647, -1],
    [2147483647, -1, 2147483647, -1],
    [0, -1, 2147483647, 2147483647],
];

console.log(`Your answer: ${getDistanceToNearestGate(rooms)}`);
console.log(
    `Correct answer: ${[
        [3, -1, 0, 1],
        [2, 2, 1, -1],
        [1, -1, 2, -1],
        [0, -1, 3, 4],
    ]}`,
);
