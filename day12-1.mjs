import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day12.input'),
    output: null,
    console: false
})

let X = 0; // + East, - West
let Y = 0; // + North, - South
let direction = 0; // 0 - East, 90 - South, 180 - West, 270 - North

readInterface.on('line', line => {
    const matches = /(\w)(\d+)/.exec(line);
    const command = matches[1];
    const value = Number(matches[2]);

    if (command === 'E' || command === 'F' && direction === 0) X += value
    else if (command === 'W' || command === 'F' && direction === 180) X -= value
    else if (command === 'N' || command === 'F' && direction === 270) Y += value
    else if (command === 'S' || command === 'F' && direction === 90) Y -= value
    else if (command === 'R') direction = (direction + value) % 360
    else if (command === 'L') direction = (360 + direction - value) % 360;
});

readInterface.on('close', () => {
    console.log('The Manhattan distance is:', Math.abs(X) + Math.abs(Y))
})
