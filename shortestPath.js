/*
Given an array of edges of an undirected graph and two nodes, return the length of the shortest path between these two nodes. 
If no such path exists, return -1. Note that the length of a path is the number of edges in the path, not the number of nodes.
*/

const { Queue } = require('./utils/queue');


const buildGraph = (edges) => {
    const graph = {};

    for (const edge of edges) {
        const [nodeOne, nodeTwo] = edge;

        const hasNodeOne = graph.hasOwnProperty(nodeOne);
        const hasNodeTwo = graph.hasOwnProperty(nodeTwo);

        if (!hasNodeOne) graph[nodeOne] = [];
        if (!hasNodeTwo) graph[nodeTwo] = [];

        graph[nodeOne].push(nodeTwo);
        graph[nodeTwo].push(nodeOne);
    }

    return graph;
};

const getShortestPathLength = (edges, startNode, targetNode) => {
    const queue = new Queue();
    const visited = new Set();

    visited.add(startNode);
    queue.enqueue({ node: startNode, pathLengthFromStart: 0 });

    const graph = buildGraph(edges);
    while (queue.size() > 0) {
        const { node, pathLengthFromStart } = queue.dequeue();

        // Process node
        if (node === targetNode) return pathLengthFromStart;

        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;

            visited.add(neighbor);
            queue.enqueue({ node: neighbor, pathLengthFromStart: pathLengthFromStart + 1 });
        }
    }

    return NO_PATH_FOUND;
};

const edges = [
    ['w', 'x'],
    ['x', 'y'],
    ['z', 'y'],
    ['z', 'v'],
    ['w', 'v'],
];
const startNode = 'w';
const targetNode = 'z';

console.log(`Your answer: ${getShortestPathLength(edges, startNode, targetNode)}`);
console.log(`Correct answer: ${2}`);
console.log();

