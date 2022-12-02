const fs = require('fs');
const es = require('event-stream');
const os = require('os');

let caloriesByElve = [];
let caloriesCounter = 0;

//part 1
const s = fs.createReadStream('./input.txt')
    .pipe(es.split())
    .pipe(es.mapSync(function(line) {
        //pause the readstream
        s.pause();
        // console.log("line:", line);
        if (line !== '') {
            caloriesCounter += Number.parseInt(line);
        } else {
            caloriesByElve.push(caloriesCounter);
            caloriesCounter = 0;
        }
        s.resume();
    })
    .on('error', function(err) {
        console.log('Error:', err);
    })
    .on('end', function() {
        console.log('Finish reading.');
        // console.log(caloriesByElve);
        console.log(Math.max(...caloriesByElve));
        part2(caloriesByElve);
    })
);

//part 2
const part2 = (list) => {
    list.sort((a, b) => a - b);
    console.log(list.slice(-3).reduce((a, b) => a + b));
}

