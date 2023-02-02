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

const CONNECTED = 1;

const getNeighbors = (node, matrix) => {
    const potentialNeighbors = matrix[node].length;
    const potentialNeighborNodes = [];

    for (let potentialNeighborNode = 0; potentialNeighborNode < potentialNeighbors; potentialNeighborNode++) {
        const isSelf = potentialNeighborNode === node;
        const isPotentialNeighbor = matrix[node][potentialNeighborNode] === CONNECTED;

        if (isSelf) continue;
        if (!isPotentialNeighbor) continue;

        potentialNeighborNodes.push(potentialNeighborNode);
    }

    return potentialNeighborNodes;
};

const markComponentAsVisited = (startNode, matrix, visited) => {
    const queue = new Queue();
    visited.add(startNode);

    queue.enqueue(startNode);

    while (queue.size() > 0) {
        // Remove row, col
        const node = queue.dequeue();

        // Process node

        // Get children
        const neighbors = getNeighbors(node, matrix);
        for (const nodeNeighbor of neighbors) {
            if (visited.has(nodeNeighbor)) continue;

            visited.add(nodeNeighbor);
            queue.enqueue(nodeNeighbor);
        }
    }
};

const numberOfProvinces = (matrix) => {
    const visited = new Set();
    let numProvinces = 0;
    const cities = matrix.length;

    for (let city = 0; city < cities; city++) {
        if (visited.has(city)) continue;

        numProvinces++;
        visited.add(city);

        markComponentAsVisited(city, matrix, visited);
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
