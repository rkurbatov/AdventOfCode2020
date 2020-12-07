import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day6.input'),
    output: null,
    console: false
})

let curSet = null;
let sum = 0;
readInterface.on('line', line => {
    if (/^$/.test(line)) { // Empty line
        sum += [...curSet].length;
        curSet = null;
    } else {
        const newSet = new Set(line.split(''))
        if (curSet === null) curSet = newSet;
        else curSet = intersection(curSet, newSet);
    }
});

readInterface.on('close', () => {
    console.log('Total number of answers is:', sum + [...curSet].length);
})

function intersection(a, b) {
    return new Set([...a].filter(x => b.has(x)));
}