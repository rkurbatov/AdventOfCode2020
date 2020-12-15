import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day13.input'),
    output: null,
    console: false
})

let i = 0;
let timestamp;
let schedule;
readInterface.on('line', function(line) {
    if (i===0) timestamp = Number(line);
    if (i===1) schedule = line.split(',').filter(b => b !== 'x').map(Number);
    i++;
})

readInterface.on('close', () => {
    let minWaiting = Infinity;
    let minId;
    schedule.forEach(bus => {
        const curWaiting = Math.ceil(timestamp/bus) * bus - timestamp;
        if (curWaiting < minWaiting) {
            minWaiting = curWaiting;
            minId = bus;
        }
    })
    console.log(minId * minWaiting);
})