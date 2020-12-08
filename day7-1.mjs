import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
    input: fs.createReadStream('day7.input'),
    output: null,
    console: false
})

const ruleSet = {};
readInterface.on('line', line => {
    const [key, value] = parseRule(line);
    ruleSet[key] = value;
});

const EMPTY_BAG = []

const colors = new Set()
readInterface.on('close', () => {
    // For every parsed rule add the reference to connected rule to build the full structure
    for (const key in ruleSet) {
        const rule = ruleSet[key];
        if (rule !== EMPTY_BAG) {
            rule.forEach(r => {
                r.ref = ruleSet[r.key];
            });
        }
    }

    for (const key in ruleSet) {
        iterate(ruleSet[key], key);
    }
    console.log([...colors].length)
})

function iterate(refArr, color) {
    if (refArr === EMPTY_BAG) return;
    else refArr.forEach(rule => {
        if (rule.key === 'shiny gold') {
            colors.add(color)
            return;
        }
        iterate(rule.ref, color);
    });
}


function parseRule(s) {
    const [_, key, rule] = /^(\w+ \w+) bags contain ((no other bags)|(\d.+)).$/.exec(s);
    let value;
    if (rule === 'no other bags') value = EMPTY_BAG
    else {
        value = rule.split(', ').map(r => {
            const [_2, amount, key] = /(\d) (\w+ \w+) bags?/.exec(r);
            return {key, amount, ref: null};
        })
    }
    return [key, value]
}

