/*
graph of nodes

array[i] = [a, b]

i: n of nodes
o: => number of connected components

Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2

0 - 1 - 2

3 - 4

*/

const { Queue } = require('./utils/queue');

const buildGraph = (edges) => {
    const graph = {};

    for (const edge of edges) {
        const [nodeOne, nodeTwo] = edge;

        const containsNodeOne = graph.hasOwnProperty(nodeOne);
        const containsNodeTwo = graph.hasOwnProperty(nodeTwo);

        if (!containsNodeOne) graph[nodeOne] = [];
        if (!containsNodeTwo) graph[nodeTwo] = [];

        graph[nodeOne].push(nodeTwo);
        graph[nodeTwo].push(nodeOne);
    }

    return graph;
};

const markComponentAsVisited = (node, edges, visited) => {
    const queue = new Queue();
    visited.add(node);
    queue.enqueue(node);

    const graph = buildGraph(edges);
    while (queue.size() > 0) {
        // Remove node
        const node = queue.dequeue();

        // Process node

        // Get children
        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            const nodeNeighbor = neighbor;
            if (visited.has(nodeNeighbor)) continue;

            visited.add(nodeNeighbor);
            queue.enqueue(nodeNeighbor);
        }
    }
};

const countComponents = (numNodes, edges) => {
    const visited = new Set();
    let numOfConnectedComponents = 0;

    for (let nodeId = 0; nodeId < numNodes; nodeId++) {
        if (visited.has(nodeId)) continue;

        numOfConnectedComponents++;
        markComponentAsVisited(nodeId, edges, visited);
    }

    return numOfConnectedComponents;
};

edges = [
    [0, 1],
    [1, 2],
    [3, 4],
];
const numNodes = 5;

console.log(`Your answer: ${countComponents(numNodes, edges)}`);
console.log(`Correct answer: ${2}`);
