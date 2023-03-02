/*
A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, 
return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.
*/

const { Queue } = require('./utils/queue');

const NO_SEQUENCE_EXIST = 0;
const ASCII_NUM_LOWER_CASE_A = 97;

const getCharFromAscii = (asciiNum) => String.fromCharCode(asciiNum);
const getAsciiNum = (letter) => letter.charCodeAt();

const getNeighbors = (word, wordListSet) => {
    const neighbors = [];
    const wordLength = word.length;

    for (let i = 0; i < wordLength; i++) {
        for (let asciiNum = getAsciiNum('a'); asciiNum < getAsciiNum('z'); asciiNum++) {
            const sliceWordBeforeI = word.slice(0, i);
            const sliceWordAfterI = word.slice(i + 1);
            const charFromAscii = getCharFromAscii(asciiNum);

            const potentialWord = sliceWordBeforeI + charFromAscii + sliceWordAfterI;

            if (!wordListSet.has(potentialWord)) continue;

            neighbors.push(potentialWord);
        }
    }

    return neighbors;
};

const getLadderLength = (beginWord, endWord, wordList) => {
    const wordListSet = new Set(wordList);
    const visitedWord = new Set();
    const queue = new Queue();

    if (wordListSet.has(beginWord)) return NO_SEQUENCE_EXIST;

    visitedWord.add(beginWord);
    queue.enqueue({ word: beginWord, sequenceSoFar: 1 });

    while (queue.size() > 0) {
        // Remove word
        const { word, sequenceSoFar } = queue.dequeue();

        // Process word
        if (word === endWord) return sequenceSoFar;

        // Get neighbors
        const neighbors = getNeighbors(word, wordListSet);
        for (const neighbor of neighbors) {
            if (visitedWord.has(neighbor)) continue;

            visitedWord.add(neighbor);
            queue.enqueue({ word: neighbor, sequenceSoFar: sequenceSoFar + 1 });
        }
    }

    return NO_SEQUENCE_EXIST;
};

const beginWord = 'hit';
const endWord = 'cog';
const wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];

console.log(`Your answer: ${getLadderLength(beginWord, endWord, wordList)}`);
console.log(`Correct answer: ${5}`);
console.log();
