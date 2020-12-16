import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day15.input'),
    output: null,
    console: false
})

// The solutions is the same. It's way too long, lol, but my time is more expensive :) Pre-mature optimization is evil.
const LAST_TURN = 30000000;
let currentTurn = 0;
const turnsMap = {}
let nextNumber = 0;

readInterface.on('line', function (line) {
    currentTurn += 1;
    turnsMap[line] = [0, currentTurn];
});

readInterface.on('close', () => {
    let prevTurn;
    while (currentTurn < LAST_TURN) {
        currentTurn += 1;
        if (currentTurn === LAST_TURN) console.log('The', LAST_TURN, 'number is', nextNumber);
        if (!turnsMap[nextNumber]) {
            turnsMap[nextNumber] = [0, currentTurn];
            nextNumber = 0;
        } else {
            prevTurn = turnsMap[nextNumber][1];
            turnsMap[nextNumber] = [prevTurn, currentTurn];
            nextNumber = currentTurn - prevTurn;
        }
    }
});