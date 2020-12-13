import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day9.input'),
    output: null,
    console: false
})

const numbers = [];
const INVALID_NUMBER = 90433990;

readInterface.on('line', line => {
    numbers.push(Number(line))
});

readInterface.on('close', () => {
    let leftIdx = 0;
    let rightIdx = 1;
    let sum = numbers[leftIdx] + numbers[rightIdx];
    while (sum !== INVALID_NUMBER) {
        if (sum < INVALID_NUMBER) {
            rightIdx += 1;
            sum += numbers[rightIdx];
        } else {
            sum -= numbers[leftIdx];
            leftIdx += 1;

        }
    }

    const interval = numbers.slice(leftIdx, rightIdx + 1);
    console.log("The weakness sum is:", Math.min(...interval) + Math.max(...interval));
})