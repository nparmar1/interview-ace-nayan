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
    const [nodeOneXcoordinate, nodeOneYCoordinate] = nodeOneCoordinates;
    const [nodeTwoXcoordinate, nodeTwoYCoordinate] = nodeTwoCoordinates;

    const distance = Math.sqrt(
        Math.pow(nodeTwoXcoordinate - nodeOneXcoordinate, 2) +
            Math.pow(nodeTwoYCoordinate - nodeOneYCoordinate, 2),
    );

    return distance;
};

const areConnected = (treeOne, treeTwo) => {
    const [treeOneXcoordinate, treeOneYCoordinate, treeOneFruitNum, treeOneVineLength] = treeOne;
    const [treeTwoXcoordinate, treeTwoYCoordinate, treeTwoFruitNum, treeTwoVineLength] = treeTwo;

    const distanceBetweenTrees = getDistanceBetweenNodes(
        [treeOneXcoordinate, treeOneYCoordinate],
        [treeTwoXcoordinate, treeTwoYCoordinate],
    );

    const smallestVineLength = Math.min(treeOneVineLength, treeTwoVineLength);
    return distanceBetweenTrees <= smallestVineLength;
};

const buildGraph = (nodes) => {
    const graph = {};
    const numNodes = nodes.length;

    for (let nodeOne = 0; nodeOne < numNodes; nodeOne++) {
        for (let nodeTwo = nodeOne + 1; nodeTwo < numNodes; nodeTwo++) {
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

const getComponentSize = (startNode, graph, visited, nodes) => {
    const queue = new Queue();

    visited.add(startNode);
    queue.enqueue(startNode);

    let componentSize = 0;
    while (queue.size() > 0) {
        //  Remove node
        const node = queue.dequeue();

        // Process node
        const currentNodeSize = nodes[nodeId][2];
        componentSize += currentNodeSize;

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

const getMaxFruit = (trees) => {
    const graph = buildGraph(trees);
    const treeVisited = new Set();
    const numTress = trees.length;
    let maxFruit = 0;

    for (let tree = 0; tree < numTress; tree++) {
        if (treeVisited.has(tree)) continue;

        const currMaxfruit = getComponentSize(tree, graph, treeVisited, trees);
        maxFruit = Math.max(maxFruit, currMaxfruit);
    }

    return maxFruit;
};
