import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day12.input'),
    output: null,
    console: false
})

let X = 0; // + East, - West
let Y = 0; // + North, - South
// Waypoint coordinates: [X, Y, quadrant] - quadrant makes rotation simpler
//    ^
//  4 | 1
// ---o--->
//  3 | 2
const wp = [10, 1, 1];

readInterface.on('line', line => {
    const matches = /(\w)(\d+)/.exec(line);
    const command = matches[1];
    const value = Number(matches[2]);

    if (command === 'E') {
        wp[0] += value;
        wp[2] = getQuadrantForCoords(wp[0], wp[1]);
    } else if (command === 'W') {
        wp[0] -= value;
        wp[2] = getQuadrantForCoords(wp[0], wp[1]);
    } else if (command === 'N') {
        wp[1] += value;
        wp[2] = getQuadrantForCoords(wp[0], wp[1]);
    } else if (command === 'S') {
        wp[1] -= value;
        wp[2] = getQuadrantForCoords(wp[0], wp[1]);
    } else if ((command === 'L' || command === 'R') && (wp[0] !== 0 || wp[1] !== 0)) { // No need to rotate if waypoint is on ship
        // New quadrant after wp rotation
        const newQ = command === 'R' ? wp[2] + value / 90 : 4 + wp[2] - value / 90
        wp[2] =  newQ > 4 ? newQ - 4 : newQ;
        // Swap coordinates after wp rotation to 90 or 270 degrees
        if (value === 90 || value === 270) {
           const t = wp[0];
           wp[0] = wp[1];
           wp[1] = t;
        }
        // Calculate signs of coordinates being in new quadrant after rotation
        wp[0] = wp[2] === 1 || wp[2] === 2 ? Math.abs(wp[0]) : -Math.abs(wp[0]);
        wp[1] = (wp[2] === 1 || wp[2] === 4) ? Math.abs(wp[1]) : -Math.abs(wp[1]);
    } else if (command === 'F') {
        X += value * wp[0];
        Y += value * wp[1];
    }
});

readInterface.on('close', () => {
    console.log('The Manhattan distance is:', Math.abs(X) + Math.abs(Y));
})

// To not handle case where waypoint is on axis separately we differ +0 and -0
// thus putting waypoint strictly to quadrant.
function getQuadrantForCoords(x, y) {
    if (x >= 0 && y >= 0) return 1
    else if (x >= 0 && y <= -0) return 2
    else if (x <= -0 && y <= -0) return 3
    else if (x <= -0 && y >= 0) return 4
}