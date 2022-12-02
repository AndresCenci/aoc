const fs = require('fs');
const readline = require('readline');
let coordinatesArray = [[], []];

const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    console: false
});

let lines = 0;
readInterface.on('line', function(line) {
    coordinatesArray[lines] = inputToCoordinates(line.split(','));
    lines ++;
});

readInterface.on('close', function() {
    const result = minDistance(coordinatesArray);
    console.log('Challenge 1: minimum distance ', result.distance);
    console.log('Challenge 2: fewer steps ', result.wireSteps1 + result.wireSteps2);
});

inputToCoordinates = (arr) => {
    let coordinates = [];
    coordinates.push({
        x: 0,
        y: 0
    });

    let lastX = 0;
    let lastY = 0;
    arr.forEach(element => {
        const direction = element.charAt(0);
        const point = parseInt(element.slice(1));

        for (let i = 0; i < point; i++) {
            switch (direction) {
                case 'L':
                    lastX--;
                    break;
                case 'R':
                    lastX++;
                    break;
                case 'U':
                    lastY++;
                    break;
                case 'D':
                    lastY--;
                    break;
                default:
                    break;
            }
            coordinates.push({
                x: lastX,
                y: lastY
            });
};
    });
    return coordinates;
};

minDistance = (arr) => {
    let minIntersection = {};
    minIntersection.distance = 0;
    minIntersection.wireSteps1 = 0;
    minIntersection.wireSteps2 = 0;
    
    for (let i = 0; i < arr.length; i++) {
        const route = arr[i];
        if (arr[i + 1]) {
            for (let j = 0; j < route.length; j++) {
                for (let k = 0; k < arr[i + 1].length; k++) {
                    if (route[j].x === arr[i + 1][k].x
                        && route[j].y === arr[i + 1][k].y
                        && (route[j].x !== 0 && route[j].y !== 0)) {
                            if((j + k) < (minIntersection.wireSteps1 + minIntersection.wireSteps2)
                                || (minIntersection.wireSteps1 === 0 && minIntersection.wireSteps2 === 0)) {
                                    minIntersection.wireSteps1 = j;
                                    minIntersection.wireSteps2 = k;
                            };
                            let mDistance = manhattanDistance(0, 0, Math.abs(route[j].x), Math.abs(route[j].y));
                            if (mDistance < minIntersection.distance || minIntersection.distance === 0) {
                                minIntersection.distance = mDistance;
                            };
                    }
                }
            }
        }
    }
    return minIntersection;
};

manhattanDistance = (x0, y0, x1, y1) => {
    return (x1 - x0) + (y1 - y0);
};
