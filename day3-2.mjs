import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day3.input'),
    output: null,
    console: false
})

let counter = 0
let lastPosition = [0, 0, 0, 0, 0];
let trees = [0, 0, 0, 0, 0];
readInterface.on('line', function(line) {
    counter++;
    if (counter === 1) return;

    lastPosition[0] = (lastPosition[0] + 1) % 31;
    if (line[lastPosition[0]] === '#') trees[0]++;

    lastPosition[1] = (lastPosition[1] + 3) % 31;
    if (line[lastPosition[1]] === '#') trees[1]++;

    lastPosition[2] = (lastPosition[2] + 5) % 31;
    if (line[lastPosition[2]] === '#') trees[2]++;

    lastPosition[3] = (lastPosition[3] + 7) % 31;
    if (line[lastPosition[3]] === '#') trees[3]++;

    if (counter % 2 === 1) {
        lastPosition[4] = (lastPosition[4] + 1) % 31;
        if (line[lastPosition[4]] === '#') trees[4]++;
    }
});

readInterface.on('close', function() {
    console.log('trees met', trees[0] * trees[1] * trees[2] * trees[3] * trees[4]);
})