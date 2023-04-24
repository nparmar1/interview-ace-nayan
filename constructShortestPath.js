/*
We can represent the input data as a graph where the cities are reprsented as nodes and the roads as edges. 
Also by looking at the input, we can represent the graph as undirected and build an adjacency list.
Thus, for finding the shortest path between two cities, we can find the shorest path the same way 
we would between nodes in our graph using a BFS.

But we need to find the path itself. So when we reach a node for the first time, the node previously
would be the ideal node to come from since it will be the shorest path. Thus, be can build a object
that maps the current node with the previous node.
*/

/*
Question:
Given 3 inputs: a start city, an end city, and a list of roads, return the shortest path (as an array) from the start city to the end city.
*/

const { Queue } = require('./utils/queue');

const buildGraph = (nodes) => {
    const graph = {};

    for (const node of nodes) {
        const [nodeOne, nodeTwo] = node;

        const containsNodeOne = graph.hasOwnProperty(nodeOne);
        const containsNodeTwo = graph.hasOwnProperty(nodeTwo);

        if (!containsNodeOne) graph[nodeOne] = [];
        if (!containsNodeTwo) graph[nodeTwo] = [];

        graph[nodeOne].push(nodeTwo);
        graph[nodeTwo].push(nodeOne);
    }

    return graph;
};

const createPath = (startNode, endNode, prevNodesMap) => {
    const path = [];
    let currentNode = endNode;

    while (currentNode !== null) {
        path.push(currentNode);
        currentNode = prevNodesMap[currentNode];
    }

    return path.reverse();
};

const getShortestPath = (startNode, endNode, nodes) => {
    const queue = new Queue();
    const visited = new Set();

    visited.add(startNode);
    queue.enqueue({ node: startNode, prevNode: null });

    const prevNodesMap = {};
    const graph = buildGraph(nodes);
    while (queue.size() > 0) {
        // Remove node
        const { node, prevNode } = queue.dequeue();

        // Process node
        prevNodesMap[node] = prevNode;

        // Get neighbors
        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;

            visited.add(neighbor);
            queue.enqueue({ node: neighbor, prevNode: node });
        }
    }
    console.log(prevNodesMap);
    return createPath(startNode, endNode, prevNodesMap);
};

const startCity = 5;
const endCity = 10;
const roads = [
    [5, 7],
    [5, 3],
    [7, 6],
    [7, 4],
    [3, 9],
    [6, 4],
    [4, 10],
    [4, 9],
];

console.log(`Your answer: ${getShortestPath(startCity, endCity, roads)}`);
console.log(`Correct answer: ${[5, 7, 4, 10]}`);
console.log();
