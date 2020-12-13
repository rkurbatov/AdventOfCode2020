import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day11.input'),
    output: null,
    console: false
})

const ferry = [];

readInterface.on('line', line => {
    ferry.push(line.split(''));
});

readInterface.on('close', () => {
    let prevOccupiedSeats = 0;
    do {
        const { curOccupiedSeats, newFerry } = iterateSeats(ferry);
        if (curOccupiedSeats === prevOccupiedSeats) break;
        ferry.forEach((_, rowIdx) => ferry[rowIdx] = newFerry[rowIdx]);
        prevOccupiedSeats = curOccupiedSeats;
    } while (1);

    console.log("Seats", prevOccupiedSeats);
})

function iterateSeats(ferry) {
    const newFerry = [];
    let adjOccupied;
    let curOccupiedSeats = 0;
    ferry.forEach((row, rowIdx) => {
        newFerry.push([]);
        row.forEach((seat, seatIdx) => {
            if (seat === '.') {
                newFerry[rowIdx][seatIdx] = '.';
            } else {
                adjOccupied = getAdjacentOccupiedSeats(ferry, rowIdx, seatIdx);
                if (seat === 'L' && adjOccupied === 0 || seat === '#' && adjOccupied < 4) {
                    newFerry[rowIdx][seatIdx] = '#';
                    curOccupiedSeats++;
                } else {
                    newFerry[rowIdx][seatIdx] = 'L';
                }
            }
        });
    });
    return { newFerry, curOccupiedSeats };
}

function getAdjacentOccupiedSeats(f, i, j) {
    return [
        (f[i-1] || [])[j-1] || '.',
        (f[i-1] || [])[j  ] || '.',
        (f[i-1] || [])[j+1] || '.',
        (f[i  ] || [])[j-1] || '.',
        'x',
        (f[i  ] || [])[j+1] || '.',
        (f[i+1] || [])[j-1] || '.',
        (f[i+1] || [])[j  ] || '.',
        (f[i+1] || [])[j+1] || '.',
    ].filter(seat => seat === '#').length;
}