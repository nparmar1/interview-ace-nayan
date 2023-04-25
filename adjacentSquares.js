/*
series of squares, 2d plane
side length of 1
find size of largest group in adjacent squares
each sqaure, x-y pair

i: array of squares [[0, 0], [1, 1]]
o: largest group of adajcent squares

const squares = [
    [0.5, 0.5],
    [1.5, 0.5],
    [2, 0.5],
    [2.5, -0.5],
    [2.5, -1.5],
    [1.5, -1.5],
];

*/

const SQUARE_SIDE_LENGTH = 1;

const areConected = (nodeOne, nodeTwo) => {
    const [nodeOneX, nodeOneY] = nodeOne;
    const [nodeTwoX, nodeTwoY] = nodeTwo;

    const differenceBetweenNodesX = Math.abs(nodeTwoX - nodeOneX);
    const differenceBetweenNodesY = Math.abs(nodeTwoY - nodeOneY);

    const areEqualedToSideLengthX =
        differenceBetweenNodesX === SQUARE_SIDE_LENGTH &&
        differenceBetweenNodesY < SQUARE_SIDE_LENGTH;
    const areEqualedToSideLengthY =
        differenceBetweenNodesY === SQUARE_SIDE_LENGTH &&
        differenceBetweenNodesX < SQUARE_SIDE_LENGTH;

    return areEqualedToSideLengthX || areEqualedToSideLengthY;
};

const buildGraph = (nodes) => {
    const numNodes = nodes.length;
    const graph = {};

    for (let nodeOne = 0; nodeOne < numNodes; nodeOne++) {
        for (let nodeTwo = nodeOne + 1; nodeTwo < numNodes; nodeTwo++) {
            if (!areConected(nodes[nodeOne], nodes[nodeTwo])) continue;

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

const getLargestGroup = (squares) => {
    const graph = buildGraph(squares);
    const numSquares = squares.length;
    const visitedSquare = new Set();
    let maxNumSquares = 0;

    for (let square = 0; square < numSquares; square++) {
        if (visitedSquare.has(square)) continue;

        const currNumSquares = getComponentSize(square, graph, visitedSquare);
        maxNumSquares = Math.max(maxNumSquares, currNumSquares);
    }
    return maxNumSquares;
};
