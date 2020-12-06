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
readInterface.on('line', function (line) {
    if (/^$/.test(line)) { // Empty line
        validPassports += Number(isValid(curPassport));
        curPassport = '';
        numOfPassports++;
    } else {
        curPassport += ' ' + line;
    }
});

readInterface.on('close', function () {
    validPassports += Number(isValid(curPassport)); // Last passport is missing
    console.log('Valid passports', validPassports, 'of', numOfPassports);
})

function isValid(passport) {
    const [_1, byr] = passport.match(/byr:(\d{4})(\s|$)/) || [];
    const [_2, iyr] = passport.match(/iyr:(\d{4})(\s|$)/) || [];
    const [_3, eyr] = passport.match(/eyr:(\d{4})(\s|$)/) || [];
    const [_4, hgt, hgt_measure] = passport.match(/hgt:(\d+)(cm|in)(\s|$)/) || [];
    const [_5, hcl] = passport.match(/hcl:(#[0-9a-f]{6})(\s|$)/) || [];
    const [_6, ecl] = passport.match(/ecl:(amb|blu|brn|gry|grn|hzl|oth)(\s|$)/) || [];
    const [_7, pid] = passport.match(/pid:(\d{9})(\s|$)/) || [];
    return !!byr && byr >= 1920 && byr <= 2002
        && !!iyr && iyr >= 2010 && iyr <= 2020
        && !!eyr && eyr >= 2020 && eyr <= 2030
        && !!hgt && (hgt_measure === 'cm' && hgt >= 150 && hgt <= 193 || hgt_measure === 'in' && hgt >= 59 && hgt <= 76)
        && !!hcl && !!ecl && !!pid;
}