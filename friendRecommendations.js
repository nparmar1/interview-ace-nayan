/*
Facebook often shows a section called “People You May Know” on a user's feed to recommend them to add new friends on Facebook. 
Imagine that we want to write an algorithm that outputs friend recommendations for a given user.

We'll write a simple algorithm: anyone who is a “friend of a friend” should be a friend recommendation (unless, of course, this individual is already friends with our given user). 
For example, if Alice is friends with Bob and Bob is friends with Carla (but Alice is not friends with Carla), then Alice should see Carla in her “People You May Know” section.

Each of our users will be represented by an ID (a number) in the range [0, n - 1] where n is the total number of users. 
You'll receive two pieces of information as input: a userId (this represents the user for whom we would like to provide friend recommendations) 
and an adjacency matrix. In our adjacency matrix, if matrix[r][c] = 1, then user r is friends with user c (and vice versa). Otherwise, matrix[r][c] should be 0. 
You should return a list of user IDs that are valid individuals for our given user's “People You May Know” section. This list can be in any order.
*/

const { Queue } = require('./utils/queue');
const FRIEND = 1;
const DEGREE_OF_SEPERATION = 2;

/*
const friendships = [
      0  1  2  3  4  5
0    [1, 1, 0, 0, 1, 1],
1    [1, 1, 1, 0, 0, 1],
2    [0, 1, 1, 1, 0, 0],
3    [0, 0, 1, 1, 0, 1],
4    [1, 0, 0, 0, 1, 0],
5    [1, 1, 0, 1, 0, 1],
];
*/

const getChildren = (node, adjacencyMatrix) => {
    const neighbors = [];
    const matrixNodeLength = adjacencyMatrix[node].length;

    for (let nodeId = 0; nodeId < matrixNodeLength; nodeId++) {
        if (adjacencyMatrix[node][nodeId] === FRIEND && nodeId !== node) neighbors.push(nodeId);
    }

    return neighbors;
};

const getFriendRecommendations = (initialUserId, friendships) => {
    const queue = new Queue();
    const visited = new Set();

    visited.add(initialUserId);
    queue.enqueue({ userId: initialUserId, distanceSoFar: 0 });

    const friendRec = [];
    while (queue.size() > 0) {
        const { userId, distanceSoFar } = queue.dequeue();

        // Process node
        const isFriends = friendships[userId][initialUserId] !== FRIEND;
        const isSeperated = distanceSoFar === DEGREE_OF_SEPERATION;

        if (isFriends && isSeperated) friendRec.push(userId);
        if (distanceSoFar > DEGREE_OF_SEPERATION) break;

        const children = getChildren(userId, friendships);
        for (const child of children) {
            if (visited.has(child)) continue;

            visited.add(child);
            queue.enqueue({ userId: child, distanceSoFar: distanceSoFar + 1 });
        }
    }

    return friendRec;
};

const userId = 0;
const friendships = [
    [1, 1, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 1],
    [0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0],
    [1, 1, 0, 1, 0, 1],
];

console.log(`Your answer: ${getFriendRecommendations(userId, friendships)}`);
console.log(`Correct answer: ${[2, 3]}`);
