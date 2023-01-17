/*
On a 2D plane, we place n stones at some integer coordinate points. Each coordinate point may have at most one stone.

A stone can be removed if it shares either the same row or the same column as another stone that has not been removed.

Given an array stones of length n where stones[i] = [xi, yi] represents the location of the ith stone, 
return the largest possible number of stones that can be removed.
*/

//
// [0, 0],
// [0, 1],
// [1, 0],
// [1, 2],
// [2, 1],
// [2, 2],

const { Queue } = require('./utils/queue');

const X_IDX = 0;
const Y_IDX = 1;

const getCoordinateString = (x, y) => `${x}, ${y}`;

const getGroupedCoordinates = (nodeCoordinates, IDX) => {
    const groupedCoordinates = {};

    for (const nodeCoordinate of nodeCoordinates) {
        const value = nodeCoordinate[IDX];

        const hasValue = groupedCoordinates.hasOwnProperty(value);
        if (!hasValue) groupedCoordinates[value] = [];

        groupedCoordinates[value].push(nodeCoordinate);
    }

    return groupedCoordinates;
};

const buildGraph = (nodeCoordinates) => {
    const graph = {};

    const groupedXcoordinates = getGroupedCoordinates(nodeCoordinates, X_IDX);
    const groupedYcoordinates = getGroupedCoordinates(nodeCoordinates, Y_IDX);

    for (const nodeCoordinate of nodeCoordinates) {
        const [x, y] = nodeCoordinate;

        const coordinateString = getCoordinateString(x, y);
        const hasCoordinateString = graph.hasOwnProperty(coordinateString);

        if (!hasCoordinateString) graph[coordinateString] = [];

        const xNeighbors = groupedXcoordinates[x];
        const yNeighbors = groupedYcoordinates[y];

        graph[coordinateString].push(...xNeighbors, ...yNeighbors);
    }

    return graph;
};

const getComponentSize = (nodeCoordinates, visited, graph) => {
    const queue = new Queue();
    const [startX, startY] = nodeCoordinates;

    const coordinateString = getCoordinateString(startX, startY);
    visited.add(coordinateString);

    queue.enqueue(nodeCoordinates);

    let componentSize = 0;
    while (queue.size() > 0) {
        const [x, y] = queue.dequeue();

        // Process node
        componentSize++;

        const neighborCoordinateString = getCoordinateString(x, y);
        const neighbors = graph[neighborCoordinateString];
        for (const neighbor of neighbors) {
            const [neighborX, neighborY] = neighbor;

            const neighborCoordinate = getCoordinateString(neighborX, neighborY);
            if (visited.has(neighborCoordinate)) continue;

            visited.add(neighborCoordinate);
            queue.enqueue(neighbor);
        }
    }
    return componentSize;
};

const getNumberOfremovedStones = (stones) => {
    const visited = new Set();
    let numberOfStonesRemoved = 0;
    const graph = buildGraph(stones);

    for (const stone of stones) {
        const [x, y] = stone;

        const coordinateString = getCoordinateString(x, y);
        if (visited.has(coordinateString)) continue;

        const componentSize = getComponentSize(stone, visited, graph);
        numberOfStonesRemoved += componentSize - 1;
    }

    return numberOfStonesRemoved;
};

const stones = [
    [0, 0],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, 2],
];

console.log(`Your answer: ${getNumberOfremovedStones(stones)}`);
console.log(`Correct answer: ${3}`);
