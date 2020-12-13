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
                if (seat === 'L' && adjOccupied === 0 || seat === '#' && adjOccupied < 5) {
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
    const lastI = f.length - 1;

    const lastJ = f[0].length - 1;

    return [
        getNearest(f, i, -1, 0, j, -1, 0),
        getNearest(f, i, -1, 0, j, 0, 0),
        getNearest(f, i, -1,0, j, +1, lastJ),
        getNearest(f, i, 0, 0, j, -1, 0),
        'x',
        getNearest(f, i, 0, 0, j, +1, lastJ),
        getNearest(f, i, +1, lastI, j, -1, 0),
        getNearest(f, i, +1, lastI, j, 0, 0),
        getNearest(f, i, +1, lastI, j, +1, lastJ),
    ].filter(seat => seat === '#').length;
}

function getNearest(f, i, iStep, iLimit, j, jStep, jLimit) {
    if (iStep !== 0 && i === iLimit || jStep !== 0 && j === jLimit) return '.';
    do {
        i += iStep;
        j += jStep;
        if (f[i][j] !== '.' || (i === iLimit && iStep !== 0) || (j === jLimit && jStep !== 0)) return f[i][j];
    } while (1);
}