import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day4.input'),
    output: null,
    console: false
})

let curPassport = '';
let validPassports = 0;
let numOfPassports = 0;
readInterface.on('line', function(line) {
    if (/^$/.test(line)) { // Empty line
        validPassports += Number(isValid(curPassport));
        curPassport = '';
        numOfPassports++;
    } else {
        curPassport += ' ' + line;
    }
});

readInterface.on('close', function() {
    validPassports += Number(isValid(curPassport)); // Last passport is missing
    console.log('Valid passports', validPassports, 'of', numOfPassports);
})

function isValid(passport) {
    return [/byr:/, /iyr:/, /eyr:/, /hgt:/, /hcl:/, /ecl:/, /pid:/].every(re => re.test(passport));
}