/*
monkey eating fruit
tree to tree
find collection of tree of fruit

list of tree
each tree: x-coordinate, y-coordinate, num of fruit, vine length

i: [2,4,5,10]
o: max of fruit 

const trees = [
    [2, 4, 2, 6],
    [10, 4, 5, 5],
    [3, 8, 3, 6],
    [12, 8, 6, 5],
    ,[1, 6 2, 6],
];

*/

const getDistanceBetweenNodes = (nodeOneCoordinates, nodeTwoCoordinates) => {
    const [nodeOneXcoordinate, nodeOneYCoordinate, nodeOneFruitNum, nodeOneLengthDistance] =
        nodeOneCoordinates;
    const [nodeTwoXcoordinate, nodeTwoYCoordinate, nodeTwoFruitNum, nodeTwoLengthDistance] =
        nodeTwoCoordinates;

    const distance = Math.sqrt(
        Math.pow(nodeTwoXcoordinate - nodeOneXcoordinate, 2) +
            Math.pow(nodeTwoYCoordinate - nodeOneYCoordinate, 2),
    );

    const smallestDistanceBetweenTwoNodes = Math.min(nodeOneLengthDistance, nodeTwoLengthDistance);
    return distance <= smallestDistanceBetweenTwoNodes;
};

const areConnected = (nodeOne, nodeTwo) => {
    const [nodeOneXcoordinate, nodeOneYCoordinate] = nodeOne;
    const [nodeTwoXcoordinate, nodeTwoYCoordinate] = nodeTwo;

    const distanceBetweenNodes = getDistanceBetweenNodes(
        [nodeOneXcoordinate, nodeOneYCoordinate],
        [nodeTwoXcoordinate, nodeTwoYCoordinate],
    );
};

const buildGraph = (nodes) => {
    const graph = {};
    const numNodes = nodes.length;

    for (let nodeOne = 0; nodeOne < numNodes; nodeOne++) {
        for (let nodeTwo = nodeOne + 1; nodeTwo < numNodes; j) {
            if (!areConnected(nodes[nodeOne], nodes[nodeTwo])) continue;

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

const getComponent = (startNode, graph, visited, nodes) => {
    const queue = new Queue();

    visited.add(startNode);
    queue.enqeue(startNode);

    let numAmount = 0;
    while (queue.size() > 0) {
        //  Remove node
        const node = queue.dequeue();

        // Process node
        numAmount += nodes[node][2];

        // Get neighbors
        const containsNode = graph.hasOwnProperty(node);
        if (!containsNode) continue;

        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;

            visited.add(neighbor);
            queue.enqeue(neighbor);
        }
    }

    return numAmount;
};

const getMaxFruit = (trees) => {
    const graph = buildGraph(trees);
    const treeVisited = new Set();
    const numTress = trees.length;
    let maxFruit = 0;

    for (let tree = 0; tree < numTress; tree++) {
        if (treeVisited.has(tree)) continue;

        const currMaxfruit = getComponent(tree, graph, treeVisited, trees);
        maxFruit = Math.max(maxFruit, currMaxfruit);
    }

    return maxFruit;
};

getMaxFruit(trees);
