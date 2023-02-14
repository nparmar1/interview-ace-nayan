/*
A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, 
return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.
*/

const { Queue } = require('./utils/queue');

const NO_SEQUENCE_FOUND = 0;
const getASCII = (char) => char.charCodeAt();
const getChar = (asciiVal) => String.fromCharCode(asciiVal);

const getAllValidCharacterInsertions = (beginning, ending, validWords) => {
    const allCharacterInsertions = [];

    for (let num = getASCII('a'); num <= getASCII('z'); num++) {
        const newChar = getChar(num);
        const newString = beginning + newChar + ending;

        if (!validWords.has(newString)) continue;

        allCharacterInsertions.push(newString);
    }

    return allCharacterInsertions;
};

const getValidOneDiffWords = (word, validWords) => {
    const validOneDiffWords = [];
    const numWords = word.length;

    for (let i = 0; i < numWords; i++) {
        const beginning = word.substring(0, i);
        const ending = word.substring(i + 1);

        const allCharacterInsertions = getAllValidCharacterInsertions(
            beginning,
            ending,
            validWords,
        );
        allCharacterInsertions.forEach((newString) => validOneDiffWords.push(newString));
    }

    return validOneDiffWords;
};

const getLadderLength = (beginWord, endWord, wordList) => {
    const validWords = new Set(wordList);
    if (!validWords.has(endWord)) return NO_SEQUENCE_FOUND;

    const visited = new Set();
    const queue = new Queue();

    visited.add(beginWord);
    queue.enqueue({
        word: beginWord,
        sequenceLengthSoFar: 1,
    });

    while (queue.size() > 0) {
        // Remove node
        const { word, sequenceLengthSoFar } = queue.dequeue();

        // Process node
        if (word === endWord) return sequenceLengthSoFar;

        // Get neighbors
        const oneDiffWords = getValidOneDiffWords(word, validWords);
        for (const newWord of oneDiffWords) {
            if (visited.has(newWord)) continue;

            visited.add(newWord);
            queue.enqueue({
                word: newWord,
                sequenceLengthSoFar: sequenceLengthSoFar + 1,
            });
        }
    }

    return NO_SEQUENCE_FOUND;
};

const beginWord = 'hit';
const endWord = 'cog';
const wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];

console.log(`Your answer: ${getLadderLength(beginWord, endWord, wordList)}`);
console.log(`Correct answer: ${5}`);
console.log();
