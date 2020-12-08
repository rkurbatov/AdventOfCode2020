import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day8.input'),
    output: null,
    console: false
})

const bootcode = [];
let acc = 0;
let pointer = 0;

readInterface.on('line', line => {
    const [_, instruction, operand] = /(nop|acc|jmp) ((\+|\-)\d+)/.exec(line);
    bootcode.push({ instruction, operand: Number(operand), executed: false });
});

readInterface.on('close', () => {
    do {
        const curInstr = bootcode[pointer];

        curInstr.executed = true;

        switch (curInstr.instruction) {
            case 'nop':
                pointer += 1;
                break;
            case 'acc':
                pointer += 1;
                acc += curInstr.operand;
                break;
            case 'jmp':
                pointer += curInstr.operand;
                break;
        }
    } while (!bootcode[pointer].executed);

    console.log('Current ACC value: ', acc);
})
