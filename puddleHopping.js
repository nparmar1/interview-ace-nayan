/*
We have a frog who loves being in the water (especially in puddles). Because of this, he refuses to travel on land. But, he loves hopping from one puddle to the next. 
So, he's looking to find the area that has the largest number of puddles for him to jump between.

You'll be given an input which is an array of puddles (note that every puddle is a circle), and for each puddle you have 3 pieces of information: 
x-position of its center, y-position of its center, and its radius. You'll also be given an input jumpSize which tells you how far our frog can jump.

Return the size of the largest group of puddles that our frog can freely jump between.
*/

const { Queue } = require('./utils/queue');

const getDistance = (coordinateOne, coordinateTwo) => {
    const [xCoordinateOne, yCoordinateOne] = coordinateOne;
    const [xCoordinateTwo, yCoordinateTwo] = coordinateTwo;

    const xDistance = xCoordinateTwo - xCoordinateOne;
    const yDistance = yCoordinateTwo - yCoordinateOne;

    const distanceBetweenNodes = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

    return distanceBetweenNodes;
};

const areConnected = (puddleOne, puddleTwo, jumpSize) => {
    const [puddleOneXcoordinate, puddleOneYcoordinate, puddleOneRadius] = puddleOne;
    const [puddleTwoXcoordinate, puddleTwoYcoordinate, puddleTwoRadius] = puddleTwo;

    const distanceFromCenterPuddle = getDistance(
        [puddleOneXcoordinate, puddleOneYcoordinate],
        [puddleTwoXcoordinate, puddleTwoYcoordinate],
    );
    const radiusSum = puddleOneRadius + puddleTwoRadius;
    const distanceBetweenPuddles = distanceFromCenterPuddle - radiusSum;

    return distanceBetweenPuddles <= jumpSize;
};

const buildGraph = (nodes, jumpSize) => {
    const graph = {};
    const numNodes = nodes.length;

    for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
            const nodeOne = i;
            const nodeTwo = j;

            if (!areConnected(nodes[nodeOne], nodes[nodeTwo], jumpSize)) continue;

            const containsNodeOne = graph.hasOwnProperty(nodeOne);
            const containsNodeTwo = graph.hasOwnProperty(nodeTwo);

            if (!containsNodeOne) graph[nodeOne] = [];
            if (!containsNodeTwo) graph[nodeTwo] = [];

            graph[nodeOne].push(nodeTwo);
            graph[nodeTwo].push(nodeOne);
        }
    }
    return graph;
};

const getComponentSize = (startNode, graph, visited) => {
    const queue = new Queue();
    visited.add(startNode);

    queue.enqueue(startNode);

    let componentSize = 0;
    while (queue.size() > 0) {
        // Remove node
        const node = queue.dequeue();

        // Process node
        componentSize++;

        // Get neighbors
        const containsNode = graph.hasOwnProperty(node);
        if (!containsNode) continue;

        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;

            visited.add(neighbor);
            queue.enqueue(neighbor);
        }
    }

    return componentSize;
};

const getLargestPuddleGroupSize = (puddles, jumpSize) => {
    const visitedPuddle = new Set();
    const graph = buildGraph(puddles, jumpSize);
    const numPuddles = puddles.length;
    let puddleSize = 0;

    for (let puddle = 0; puddle < numPuddles; puddle++) {
        if (visitedPuddle.has(puddle)) continue;

        const currentPuddleSize = getComponentSize(puddle, graph, visitedPuddle);
        puddleSize = Math.max(puddleSize, currentPuddleSize);
    }

    return puddleSize;
};

const puddles = [
    [0, 0, 1],
    [10, 5, 1],
    [11, -5, 1],
    [3, 1, 1],
    [11, 2, 2],
    [2, -3, 1],
    [13, 4, 3],
    [2, 2, 1],
];
const jumpSize = 5;

console.log(`Your answer: ${getLargestPuddleGroupSize(puddles, jumpSize)}`);
console.log(`Correct answer: ${4}`);
console.log();
