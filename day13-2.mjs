import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day13.input'),
    output: null,
    console: false
})

let i = 0;
let schedule;
readInterface.on('line', function (line) {
    if (i === 1) schedule = line.split(',').map(
        (busNumber, offset) => busNumber === 'x' ? null : {busNumber: Number(busNumber), offset}
    ).filter(Boolean);
    i++;
})

// Though this task can be solved via Chinese Remnant Theorem, there is a much simpler solution.
// The naive approach is to increase the timestamp by 1 and to check if it matches all the bus numbers
// (timestamp + offset) mod busNumber equals to zero. But as this will take ages we need to find a way to increase
// the check step. And we can do that with every new bus by multiplying the step on the bus number!
readInterface.on('close', () => {
    let timestamp = 0;
    let step = 1;

    schedule.forEach(({busNumber, offset}) => {
        while ((timestamp + offset) % busNumber) timestamp += step;
        step = step * busNumber;
    })

    console.log('The timestamp is:', timestamp);
})
