/*
During the COVID-19 pandemic, contact tracing became incredibly important. 
For this problem, you'll implement a contact tracing algorithm. 
Given a person, you want to return the distance between them and the closest person to them who has COVID-19.

For example, if Alice has a friend of a friend of a friend who has COVID-19, 
then Alice's output would be 3 (or potentially lower if she has a shorter path to someone with COVID-19). 
In this problem, people will be represented as IDs (numbers in the range [0, n-1] where n is the number of people).

You'll be given a person number, an array of friendships, and an array of individuals infected with COVID-19. 
The friendships array will contain a bunch of smaller arrays of size 2. For each smaller array [a,b], we conclude that a is friends with b and b is friends with a. 
You must return the smallest degree of separation between the given person and an individual who has COVID-19, 
or -1 if the given person has no connection to an infected individual.
*/

const { Queue } = require('./utils/queue');
const NO_INFECTED_FOUND = -1;

const buildGraph = (edges) => {
    const graph = {};

    for (const edge of edges) {
        const [nodeOne, nodeTwo] = edge;

        const hasNodeOne = graph.hasOwnProperty(nodeOne);
        const haNodeTwo = graph.hasOwnProperty(nodeTwo);

        if (!hasNodeOne) graph[nodeOne] = [];
        if (!haNodeTwo) graph[nodeTwo] = [];

        graph[nodeOne].push(nodeTwo);
        graph[nodeTwo].push(nodeOne);
    }

    return graph;
};

const findClosestContactDistance = (initialPersonId, friendships, infectedPeople) => {
    const queue = new Queue();
    const visited = new Set();
    const infected = new Set(infectedPeople);

    visited.add(initialPersonId);
    queue.enqueue({ personId: initialPersonId, pathSoFar: 0 });

    const graph = buildGraph(friendships);
    while (queue.size() > 0) {
        const { personId, pathSoFar } = queue.dequeue();

        // Process node
        const isInfected = infected.has(personId);
        if (isInfected) return pathSoFar;

        const neighbors = graph[personId];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;

            visited.add(neighbor);
            queue.enqueue({ personId: neighbor, pathSoFar: pathSoFar + 1 });
        }
    }

    return NO_INFECTED_FOUND;
};

const initialPersonId = 0;
const friendships = [
    [0, 1],
    [0, 2],
    [2, 8],
    [2, 9],
    [1, 3],
    [3, 4],
    [4, 6],
    [6, 7],
    [8, 9],
    [7, 5],
];
const infectedPeople = [5, 6, 7];

console.log(
    `Your answer: ${findClosestContactDistance(initialPersonId, friendships, infectedPeople)}`,
);
console.log(`Correct answer: ${4}`);
console.log();

