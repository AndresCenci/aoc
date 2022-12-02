const fs = require('fs');
const readline = require('readline');
let inputArray = [];
const test1 = [1,0,0,0,99];
const test2 = [2,3,0,3,99];
const test3 = [2,4,4,5,99,0];
const test4 = [1,1,1,4,99,5,6,0,99];

const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    console: false
});

readInterface.on('line', function(line) {
    inputArray = line.split(',').map(str => parseInt(str, 10));
});

readInterface.on('close', function() {
    let inputArrayCopy = [...inputArray];
    inputArrayCopy[1] = 12;
    inputArrayCopy[2] = 2;
    console.log('Value position 0: ', intCode(inputArrayCopy)[0]);
    getOutput();
});

intCode = (arr) => {
    for (let i = 0; i <= arr.length; i += 4) {
        const opcode = arr[i];
        switch (opcode) {
            case 1: {
                arr[arr[i + 3]] = arr[arr[i + 1]] + arr[arr[i + 2]];
                break;
            }
            case 2: {
                arr[arr[i + 3]] = arr[arr[i + 1]] * arr[arr[i + 2]];
                break;
            }
            case 99: {    
                i = arr.length;
                break;
            }
        }
    }
    return arr;
};

getOutput = () => {
    for (let i = 0; i <= 99; i++) {
        for (let j = 0; j <= 99; j++) {
            const inputArrayCopy = [...inputArray];
            inputArrayCopy[1] = i;
            inputArrayCopy[2] = j;
            let value = intCode(inputArrayCopy)[0];
            if (value === 19690720) {
                console.log('Return 19690720 for noun: ', i, ' verb: ', j);
                console.log('100 * noun + verb = ', 100 * i + j);
                break;
            }
        }    
    }
}

// console.log(intCode(test1))
// console.log(intCode(test2))
// console.log(intCode(test3))
// console.log(intCode(test4))
