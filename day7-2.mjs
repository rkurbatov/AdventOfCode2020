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

let totalBags = 0;
readInterface.on('close', () => {
    for (const key in ruleSet) {
        const rule = ruleSet[key];
        if (rule !== EMPTY_BAG) {
            rule.forEach(r => {
                r.ref = ruleSet[r.key];
            });
        }
    }

    iterate(ruleSet['shiny gold'], 1);
    console.log('Total amount of bags in my shiny gold bag:', totalBags)
})

function iterate(refArr, amt) {
    if (refArr === EMPTY_BAG) return;
    else refArr.forEach(rule => {
        totalBags += amt * rule.amount;
        iterate(rule.ref, amt * rule.amount);
    });
}


function parseRule(s) {
    const [_, key, rule] = /^(\w+ \w+) bags contain ((no other bags)|(\d.+)).$/.exec(s);
    let value;
    if (rule === 'no other bags') value = EMPTY_BAG
    else {
        value = rule.split(', ').map(r => {
            const [_2, amount, key] = /(\d+) (\w+ \w+) bags?/.exec(r);
            return {key, amount: Number(amount), ref: null};
        })
    }
    return [key, value]
}

