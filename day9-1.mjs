import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day9.input'),
    output: null,
    console: false
})

let idx = 0;
let preamble = [];
let sumsHash = {};

const PREAMBLE_LENGTH = 25;

readInterface.on('line', line => {
    const curNumber = Number(line);
    if (idx > PREAMBLE_LENGTH) {
        if (!sumsHash[curNumber]) console.log('Number ', curNumber, 'on position', idx, 'is faulty!');
        removeFirst(preamble);
    }
    add(preamble, curNumber);
    idx++;
});

function add(window, num) {
    window.forEach(n => {
        sumsHash[num + n] = (sumsHash[num + n] || 0) + 1;
    })
    window.push(num);
}

function removeFirst(window) {
    const num = window.shift();
    window.forEach(n => {
        if (--sumsHash[num + n] === 0) delete sumsHash[num + n];
    })
}