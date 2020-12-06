import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day3.input'),
    output: null,
    console: false
})

let counter = 0
let lastPosition = 0;
let trees = 0;
readInterface.on('line', function(line) {
    counter++;
    if (counter === 1) return;
    lastPosition = (lastPosition + 3) % 31;
    if (line[lastPosition] === '#') trees++;
});

readInterface.on('close', function() {
    console.log('trees met', trees)
})