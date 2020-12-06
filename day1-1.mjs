import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day1.input'),
    output: null,
    console: false
})

let nums = [];

readInterface.on('line', line => {
    nums.push(Number(line))
});

const YEAR = 2020;

readInterface.on('close', () => {
    for (let i = 0; i <= nums.length - 2; i++) {
        for (let j = i; j <= nums.length - 1; j++) {
            if (nums[i] + nums[j] === YEAR) {
                console.log('Valid numbers:', nums[i], nums[j], 'Product:', nums[i] * nums[j])
            }
        }
    }
})

