import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day15.input'),
    output: null,
    console: false
})

const LAST_TURN = 2020;
let currentTurn = 0;
const turnsMap = {}
let nextNumber = 0;

readInterface.on('line', function (line) {
    currentTurn += 1;
    turnsMap[line] = currentTurn;
});

readInterface.on('close', () => {
    let prevTurn;
    while (currentTurn < LAST_TURN) {
        currentTurn += 1;
        if (currentTurn === LAST_TURN) console.log('The', LAST_TURN, 'number is', nextNumber);
        if (!turnsMap[nextNumber]) {
            turnsMap[nextNumber] = currentTurn;
            nextNumber = 0;
        } else {
            prevTurn = turnsMap[nextNumber];
            turnsMap[nextNumber] = currentTurn;
            nextNumber = currentTurn - prevTurn;
        }
    }
});