import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day6.input'),
    output: null,
    console: false
})

let curGroup = '';
let sum = 0;
readInterface.on('line', line => {
    if (/^$/.test(line)) { // Empty line
        sum += getNumberOfAnswers(curGroup);
        curGroup = '';
    } else {
        curGroup += line;
    }
});

readInterface.on('close', () => {
    sum += getNumberOfAnswers(curGroup);
    console.log('Total number of answers is:', sum);
})

function getNumberOfAnswers(s) {
    return [...new Set(s.split(''))].length;
}