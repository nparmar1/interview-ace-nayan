/*
Imagine that we have some special sharks, and these sharks tend to travel in pods. However, these sharks are competitive. 
Two sharks will only be willing to hunt together if they deem each other to be worthy. 
The sharks will deem each other worthy if the difference between their tooth size is less than or equal to 1 (inches) 
OR the difference between their fin size is less than or equal to 4 (inches).

Additionally, these sharks are highly respectful creatures. So, if shark 1 believes shark 2 is worthy, and shark 2 believes shark 3 is worth, 
then shark 1 and shark 3 will deem each other to be worthy (because they respect shark 2's opinion).

Given a list of smaller arrays representing sharks (e.g. [[2,4]] means we have one shark with a tooth size of 2 and a fin size of 4), 
return the number of pods that these sharks will form.
*/

const { Queue } = require('./utils/queue');

const MAX_TOOTH_SIZE = 1;
const MAX_FIN_SIZE = 4;

const areSharksWorthy = (nodeOne, nodeTwo) => {
    const [sharkOneTooth, sharkOneFin] = nodeOne;
    const [sharkTwoTooth, sharkTwoFin] = nodeTwo;

    const toothSizeDifference = Math.abs(sharkOneTooth - sharkTwoTooth);
    const finSizeDifference = Math.abs(sharkOneFin - sharkTwoFin);

    return toothSizeDifference <= MAX_TOOTH_SIZE || finSizeDifference <= MAX_FIN_SIZE;
};

const getGraph = (nodes) => {
    const graph = {};
    const numNodes = nodes.length;

    for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
            const nodeOne = nodes[i];
            const nodeTwo = nodes[j];

            if (!areSharksWorthy(nodeOne, nodeTwo)) continue;

            const containsNodeOne = graph.hasOwnProperty(nodeOne);
            const containsNodeTwo = graph.hasOwnProperty(nodeTwo);

            if (!containsNodeOne) graph[nodeOne] = [];
            if (!containsNodeTwo) graph[nodeTwo] = [];

            graph[nodeOne].push(nodeTwo);
            graph[nodeTwo].push(nodeOne);
        }
    }

    console.log(graph);
};

const markedComponentAsVisited = (node, visited, graph) => {
    const queue = new Queue();
    visited.add(node);

    queue.enqueue(node);

    while (queue.size() > 0) {
        // Remove node
        const node = queue.dequeue();

        // Process node

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
};

const countSharkPods = (sharks) => {
    const visitedShark = new Set();
    const graph = getGraph(sharks);
    let numSharkPods = 0;

    for (const shark of sharks) {
        if (visitedShark.has(shark)) continue;

        numSharkPods++;
        markedComponentAsVisited(shark, visitedShark, graph);
    }

    return numSharkPods;
};

const sharks = [
    [2, 4],
    [10, 20],
    [1.5, 9],
    [10, 22],
    [0.1, 1],
    [19, 18],
    [7, 13],
    [12, 26],
];

console.log(`Your answer: ${countSharkPods(sharks)}`);
console.log(`Correct answer: ${2}`);
console.log();

// class Shark {
//     constructor(tooth, fin) {
//         this.tooth = tooth;
//         this.fin = fin;
//     }
// }

// const sharkOne = new Shark(2, 4);
// const sharkTwo = new Shark(10, 20);
// const sharkThree = new Shark(1.5, 9);

// const sharks = [sharkOne, sharkTwo, sharkThree];
