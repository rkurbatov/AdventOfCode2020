import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day10.input'),
    output: null,
    console: false
})

const adapters = [];
const distances = [];

readInterface.on('line', line => {
    adapters.push(Number(line))
});

readInterface.on('close', () => {
    adapters.sort((a, b) => a - b).push(adapters[adapters.length - 1] + 3);
    adapters.forEach((ad, i) => {
        distances.push(ad - (adapters[i - 1] || 0));
    });
    let helper = 0;
    const permutations = distances.reduce((acc, d) => {
        if (d === 1) {
            helper++;
            return acc;
        }
        if (d === 3) {
            acc = acc * perms(helper);
            helper = 0;
            return acc;
        }
    }, 1);
    console.log('Result is:', permutations);
})

// Manually calculated :) Amount of permutations for the series of '1' jolts distance.
// Like 1,1 can be used with 2 variation (1,2,3 or 1,3),
// 1, 1,1 with 4 variations (1,2,3,4 or 1,2,4 or 1,3,4 or 1,4) and so on.
// As there is no more than 5 sequential 1 jolt differences used (actually even 4) this works.
function perms(n) {
    if (n <= 1) return 1;
    if (n === 2) return 2;
    if (n === 3) return 4;
    if (n === 4) return 7;
    if (n === 5) return 11;
}
