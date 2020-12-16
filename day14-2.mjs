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
        const indexes = applyMask(curMask, Number(match[1]).toString(2));
        indexes.forEach(i => memory[i] = Number(match[2]));
    }

});

readInterface.on('close', () => {
    console.log(Object.values(memory).reduce((acc, v) => acc + v, 0));
});

function applyMask(mask, binary) {
    const nonFloatingBinary = mask.split('').reduceRight(
        (acc, maskV, idx) => {
            const binaryV = binary[idx - mask.length + binary.length] || '0' // 0 for left padding
            return (maskV === 'X' ? 0 : maskV === '0' ? binaryV : '1') + acc
        }
        , '')

    const floating = mask.split('').reduceRight((acc, maskV, idx) => {
        if (maskV === 'X') {
            const multiplier = 2 ** (mask.length - idx - 1);
            if (acc.length === 0) return [0, multiplier];
            return [...acc, ...acc.map(accV => accV + multiplier)];
        } else return acc;
    }, []);
    return floating.map(el => el + parseInt(nonFloatingBinary, 2));
}