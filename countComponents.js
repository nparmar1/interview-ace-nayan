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

const buildGraph = (edges) => {
    const graph = {};

    for (const edge of edges) {
        const [nodeOne, nodeTwo] = edge;

        const isNodeOne = graph.hasOwnProperty(nodeOne);
        const isNodeTwo = graph.hasOwnProperty(nodeTwo);

        if (!isNodeOne) graph[nodeOne] = [];
        if (!isNodeTwo) graph[nodeTwo] = [];

        graph[nodeOne].push(nodeTwo);
        graph[nodeTwo].push(nodeOne);
    }

    return graph;
};

const markAsVisited = (node, edges, visited) => {
    const queue = new Queue();
    queue.enqueue([node]);

    const graph = buildGraph(edges);
    while (queue.size() > 0) {
        // Remove node
        const [node] = queue.dequeue();

        // Process node

        // Get children
        const children = graph[node];
        for (const child of children) {
            const [childNode] = child;
            if (visited.has(childNode)) continue;

            visited.add(childNode);
            queue.enqueue([childNode]);
        }
    }
};

const countComponents = (nodes, edges) => {
    const visited = new Set();
    let connectedComponents = 0;

    for (const node = 0; node < nodes; node++) {
        if (visited.has(node)) continue;

        visited.add(node);
        connectedComponents++;

        markAsVisited(node, edges, visited);
    }

    return connectedComponents;
};
