import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day5.input'),
    output: null,
    console: false
})

let highest = 0;
readInterface.on('line', line => {
    const binary = line.split('').map(c => c === 'B' || c === 'R' ? '1' : '0').join('');
    const decimal = parseInt(binary, 2);
    if (highest < decimal) highest = decimal;
});

readInterface.on('close', () => {
    console.log('The highest Seat ID is:', highest);
})
