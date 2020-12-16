import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day14.input'),
    output: null,
    console: false
})

let curMask = '';
let memory = {};

readInterface.on('line', function (line) {
    let match
    if (match = line.match(/mask = ([X01]+)/)) {
        curMask = match[1];
    } else if (match = line.match(/mem\[(\d+)\] = (\d+)/)) {
        memory[match[1]] = applyMask(curMask, Number(match[2]).toString(2));
    }

});

readInterface.on('close', () => {
    console.log(Object.values(memory).reduce((acc, v) => acc + v, 0));
});

function applyMask(mask, binary) {
    const maskedNumber = mask.split('').reduceRight(
        (acc, maskV, idx) => {
            const binaryV = binary[idx - mask.length + binary.length] || '0' // 0 for left padding
            return (maskV === 'X' ? binaryV : maskV) + acc
        }
        , '')
    return parseInt(maskedNumber, 2);
}