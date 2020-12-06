import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day5.input'),
    output: null,
    console: false
})

const tickets = new Array(128).fill(0);
readInterface.on('line', line => {
    const binary = line.split('').map(c => c === 'B' || c === 'R' ? '1' : '0').join('');
    const row = parseInt(binary.substr(0,7), 2);
    const column = parseInt(binary.substr(7, 3), 2);
    tickets[row] += column; // For filled row sum should be 0+1+2+...+7 = 28
});

readInterface.on('close', () => {
    tickets.forEach((rowTickets, rowNumber) => {
        // As the filled row gives sum 28, if only one seat is absent the sum should be in [21..28] interval (28 - [0..7]).
        // But the seat is neither most left nor most right, so the sum is in [22..27] interval.
        if (rowTickets >= 22 && rowTickets <= 27) {
            const columnNumber = 28 - rowTickets;
            console.log('My SeatID is:', rowNumber * 8 + columnNumber);
        }
    })
})
