import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day2.input'),
    output: null,
    console: false
})

let counter = 0
readInterface.on('line', function(line) {
    counter += Number(isValidString(line))
});

readInterface.on('close', function() {
    console.log('Valid passwords: ', counter)
})

function isValidString(s) {
    const [_, firstPos, secondPos, symbol, password] = /(\d+)-(\d+) (\w): (\w+)/.exec(s)
    const firstChar = password[Number(firstPos) - 1]
    const secondChar = password[Number(secondPos) - 1]
    return !!firstChar && !!secondChar && (firstChar === symbol && secondChar !== symbol || firstChar !== symbol && secondChar === symbol)
}