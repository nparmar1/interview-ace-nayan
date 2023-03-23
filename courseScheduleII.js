/*
For this approach, we can represent the input as a graph where in order to take a course, 
you have to complete a prereq, which is the same as two nodes conntected by an edge.
 
In order to traverse to the next node, you have to start with the one connected to it prior. 
As you can see, it's going to be a directed graph, since we can also travel in one direction.

Since we are trying to find a valid ordering for all these courses that respects our prereqs, 
we can approach it the same way that processes all of ours nodes that respects the ordering of ours edges.
Thus we can use a BFS that allows use a top sort algorithm.
*/

/*
Question:
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. 
You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must 
take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return the ordering of courses you should take to finish all courses. 
If there are many valid answers, return any of them. 

If it is impossible to finish all courses, return an empty array.
*/

const { Queue } = require('./utils/queue');

const buildGraph = (numNodes, prereqNodes) => {
    const graph = {};

    for (let node = 0; node < numNodes; node++) {
        graph[node] = [];
    }

    for (const prereqNode of prereqNodes) {
        const [mainCource, prereq] = prereqNode;

        graph[prereq].push(mainCource);
    }

    return graph;
};

const getIndegreeMap = (numNodes, prereqNodes) => {
    const indegreeMap = {};

    for (let node = 0; node < numNodes; node++) {
        indegreeMap[node] = 0;
    }

    for (const prereqNode of prereqNodes) {
        const [node, prereq] = prereqNode;
        indegreeMap[node]++;
    }

    return indegreeMap;
};

const getIndgreeZeroNodesQueue = (indegreeMap, numNodes) => {
    const indegreeZeroNodesQueue = new Queue();

    for (let node = 0; node < numNodes; node++) {
        if (indegreeMap[node] === 0) indegreeZeroNodesQueue.enqueue(node);
    }

    return indegreeZeroNodesQueue;
};

const getValidOrderNodes = (graph, indegreeMap, numNodes) => {
    const indegreeZeroNodesQueue = getIndgreeZeroNodesQueue(indegreeMap, numNodes);
    const validOrderNodes = [];

    while (indegreeZeroNodesQueue.size() > 0) {
        // Remove node
        const node = indegreeZeroNodesQueue.dequeue();

        // Process node
        validOrderNodes.push(node);

        // Get neighbors
        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            indegreeMap[neighbor]--;
            if (indegreeMap[neighbor] === 0) indegreeZeroNodesQueue.enqueue(neighbor);
        }
    }
    return validOrderNodes;
};

const getOrder = (numCourses, prerequisites) => {
    const graph = buildGraph(numCourses, prerequisites);
    const indegreeMap = getIndegreeMap(numCourses, prerequisites);

    const validOrderNodes = getValidOrderNodes(graph, indegreeMap, numCourses);

    if (validOrderNodes.length < numCourses) return [];
    return validOrderNodes;
};

const numCourses = 4;
const prerequisites = [
    [1, 0],
    [2, 0],
    [3, 1],
    [3, 2],
];

console.log(`Your answer: ${getOrder(numCourses, prerequisites)}`);
console.log(`Correct answer: ${[0, 1, 2, 3]}`);
console.log();
