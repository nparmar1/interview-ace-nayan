/*
There are many religious fishermen at sea. Two fishermen will work together in a squad if either they have the same religion or the same fishing rod. 
Also, if fisherman Alex is willing to work with fisherman Bob, and fisherman Bob is willing to work with fisherman Caleb, 
then fisherman Alex and fisherman Caleb will be willing to work together (because they trust fisherman Bob).

You'll be given an array where each element represents a fisherman (e.g. [['christianity', 'Johnny Morris']] means 
we have 1 fisherman whose religion is 'christianity' and whose fishing rod is 'Johnny Morris'). 
You must return the size of the largest squad of fishermen.
*/

const { Queue } = require('./utils/queue');

const areFishermenWorkingTogether = (fishermanOne, fishermanTwo) => {
    const [fishermanOneReligion, fishermanOneFishingRod] = fishermanOne;
    const [fishermanTwoReligion, fishermanTwoFishingRod] = fishermanTwo;

    return (
        fishermanOneReligion === fishermanTwoReligion ||
        fishermanOneFishingRod === fishermanTwoFishingRod
    );
};

const buildGraph = (nodes) => {
    const graph = {};
    const numNodes = nodes.length;

    for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
            const nodeOne = i;
            const nodeTwo = j;

            if (!areFishermenWorkingTogether(nodes[nodeOne], nodes[nodeTwo])) continue;

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

const getNumOfNodes = (node, visited, graph) => {
    const queue = new Queue();
    visited.add(node);

    queue.enqueue(node);

    let numNodes = 0;
    while (queue.size() > 0) {
        // Remove node
        const node = queue.dequeue();

        // Process node
        numNodes++;

        // Get neighbors
        const containsNodeInGraph = graph.hasOwnProperty(node);
        if (!containsNodeInGraph) continue;

        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;

            visited.add(neighbor);
            queue.enqueue(neighbor);
        }
    }
    return numNodes;
};

const findLargestSquadSize = (fishermen) => {
    const numFishermen = fishermen.length;
    const visitedFisherman = new Set();
    const graph = buildGraph(fishermen);
    let numSquadFishermen = 0;

    for (let fishermanId = 0; fishermanId < numFishermen; fishermanId++) {
        if (visitedFisherman.has(fishermanId)) continue;

        const currentNumSquadFishermen = getNumOfNodes(fishermanId, visitedFisherman, graph);
        numSquadFishermen = Math.max(numSquadFishermen, currentNumSquadFishermen);
    }
    return numSquadFishermen;
};

const fishermen = [
    ['Sikhism', 'Orvis'],
    ['Christianity', 'Johnny Morris'],
    ['Buddhism', 'Winn Grip'],
    ['Islam', 'Shimano'],
    ['Christianity', 'Fuji'],
    ['Buddhism', 'Shimano'],
    ['Christianity', 'Fuji'],
    ['Judaism', 'Fuji'],
    ['Christianity', 'Johnny Morris'],
    ['Hinduism', 'Orvis'],
];

console.log(`Your answer: ${findLargestSquadSize(fishermen)}`);
console.log(`Correct answer: ${5}`);
console.log();
