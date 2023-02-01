/*

actor name as input, must return actor's bacon number

actor name is min requirement to close to kevin bacon

for expamle a worked with b and b worked with KB, min input would be 2

actor will have a reltionship with one actor and vice versa


kevin bacon - carly 

kevin - fred - emma - richard

*/

const { Queue } = require('./utils/queue');

const actorGraph = {
    'Kevin Bacon': ['Carly', 'Fred', 'Isabella'],
    Carly: ['Kevin Bacon'],
    Fred: ['Kevin Bacon', 'Emma', 'Richard'],
    Emma: ['Molly', 'Justin', 'Fred'],
    Molly: ['Emma'],
    Justin: ['Emma', 'Jacob'],
    Jacob: ['Justin', 'Julia'],
    Julia: ['Jacob'],
    Richard: ['Fred', 'Olivia', 'Andrew'],
    Olivia: ['Richard', 'Ben'],
    Ben: ['Olivia'],
    Andrew: ['Richard', 'Sophia'],
    Sophia: ['Andrew'],
    Isabella: ['Edward', 'Brian', 'Alexa', 'Kevin Bacon'],
    Edward: ['Isabella'],
    Brian: ['Isabella', 'Kendall'],
    Kendall: ['Brian'],
    Alexa: ['Isabella', 'Harry', 'Diana', 'Grace'],
    Harry: ['Alexa'],
    Diana: ['Alexa'],
    Grace: ['Alexa', 'Monica'],
    Monica: ['Grace', 'Taylor'],
    Taylor: ['Monica', 'Robert'],
    Robert: ['Taylor', 'Hayley'],
    Hayley: ['Robert', 'Jessica'],
    Jessica: ['Hayley', 'Jennifer'],
    Jennifer: ['Jessica', 'Kate'],
    Kate: ['Jennifer'],
};

const TARGET_ACTOR = 'Kevin Bacon';
const NO_ACTOR_FOUND = '';

const getActorsWhoHaveWorkedWith = (actor) => {
    if (!actorGraph.hasOwnProperty(actor)) return [];

    return actorGraph[actor];
};

const getBaconNumber = (initialActor) => {
    const queue = new Queue();
    const visited = new Set();

    visited.add(initialActor);
    queue.enqueue({ actor: initialActor, pathLengthSofar: 0 });

    while (queue.size() > 0) {
        const { actor, pathLengthSofar } = queue.dequeue();

        // Process node
        const isTargetActor = actor === TARGET_ACTOR;
        if (isTargetActor) return pathLengthSofar;

        const neighbors = getActorsWhoHaveWorkedWith(actor);
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;

            visited.add(neighbor);
            queue.enqueue({ actor: neighbor, pathLengthSofar: pathLengthSofar + 1 });
        }
    }

    return NO_ACTOR_FOUND;
};

console.log(`Your answer: ${getBaconNumber('Grace')}`);
console.log(`Correct answer: ${3}`);
