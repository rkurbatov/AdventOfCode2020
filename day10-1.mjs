import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day10.input'),
    output: null,
    console: false
})

const adapters = [];

readInterface.on('line', line => {
    adapters.push(Number(line))
});

readInterface.on('close', () => {
    let n1 = 0;
    let n3 = 0;
    adapters.sort((a, b) => a - b).push(adapters[adapters.length - 1] + 3)
    adapters.forEach((a, i) => {
        const compare = i === 0 ? 0 : adapters[i - 1];
        if (a - compare === 1) n1 += 1;
        if (a - compare === 3) n3 += 1;
    });

    console.log('N1', n1, 'N3', n3, 'answer: ', n1 * n3);
})