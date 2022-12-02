const fs = require('fs');
const readline = require('readline');
let inputArray = [];
const test2 = 14;
const test3 = 1969;
const test4 = 100756;

const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    console: false
});

readInterface.on('line', function(line) {
    inputArray.push(parseInt(line));
});

readInterface.on('close', function() {
    console.log('Challenge 1 - Total Fuel: ', fuelTotalChallenge1(inputArray));
    console.log('Challenge 2 - Total Fuel: ', fuelTotalChallenge2(inputArray));
});

fuel = mass => {
    return Math.floor(mass / 3) - 2;
};

fuelExtra = fuel => {
    if (fuel <= 0) return 0;
    return fuel + fuelExtra(Math.floor(fuel / 3) - 2)
};

fuelTotalChallenge1 = arr => {
    return arr.reduce((a, b) => { return a + fuel(b) }, 0);
};

fuelTotalChallenge2 = arr => {
    return arr.reduce((a, b) => { return a + fuelExtra(fuel(b)) }, 0);
};

// console.log('test2: ', fuelExtra(fuel(test2)))
// console.log('test3: ', fuelExtra(fuel(test3)))
// console.log('test4: ', fuelExtra(fuel(test4)))
