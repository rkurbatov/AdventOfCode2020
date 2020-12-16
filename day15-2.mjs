import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day15.input'),
    output: null,
    console: false
})

// The solutions is much faster though uses more memory.
const LAST_TURN = 30000000;
const curValues = new Uint32Array(LAST_TURN)
let currentTurn = 0;
let nextNumber = 0;

readInterface.on('line', function (line) {
    currentTurn += 1;
    curValues[Number(line)] = currentTurn;
});

readInterface.on('close', () => {
    let prevTurn;
    while (currentTurn < LAST_TURN) {
        currentTurn += 1;
        if (currentTurn === LAST_TURN) console.log('The', LAST_TURN, 'number is', nextNumber);
        if (!curValues[nextNumber]) {
            curValues[nextNumber] = currentTurn;
            nextNumber = 0;
        } else {
            prevTurn = curValues[nextNumber];
            curValues[nextNumber] = currentTurn;
            nextNumber = currentTurn - prevTurn;
        }
    }
});