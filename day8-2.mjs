import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day8.input'),
    output: null,
    console: false
})

const bootcode = [];
let acc;
let pointer;
let modifiedBootcode;

readInterface.on('line', line => {
    const [_, instruction, operand] = /(nop|acc|jmp) ((\+|\-)\d+)/.exec(line);
    bootcode.push({instruction, operand: Number(operand), executed: false});
});

readInterface.on('close', () => {
    for (let i = 0; i < bootcode.length; i++) {
        if (bootcode[i].instruction === 'acc') continue;

        modifiedBootcode = getFixedBootcode(i);
        acc = 0;
        pointer = 0;

        do {
            const curInstr = modifiedBootcode[pointer];

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
            if (pointer >= bootcode.length) {
                console.log('Current ACC value: ', acc);
                break;
            }
        } while (!modifiedBootcode[pointer].executed);
    }
})

function getFixedBootcode(errPointer) {
    return bootcode.map((instr, i) => {
        if (i !== errPointer) return {...instr}
        else return {
            ...instr,
            instruction: instr.instruction === 'nop'
                ? 'jmp'
                : 'nop'
        }
    });
}