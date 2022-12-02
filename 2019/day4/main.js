countCriteria = (minRange, maxRange) => {
    let count = 0;

    for (let i = minRange; i <= maxRange; i++) {
        let decrescents = 0;
        let sameAdjacents = 0;
        const passArray = i.toString(10).split('').map(Number);
    
        for (let j = 0; j < passArray.length - 1; j++) {
            if (passArray[j] > passArray[j + 1]) {
                decrescents++;
            }
            if(passArray[j] === passArray[j + 1]) {
                sameAdjacents++;
            }
        }
        if (decrescents === 0 && sameAdjacents > 0) {
            count++;
        }
    }
    return count;
}

countCriteria2 = (minRange, maxRange) => {
    let count = 0;

    for (let i = minRange; i <= maxRange; i++) {
        let decrescents = 0;
        let sameAdjacents = 0;
        let hasAdyacents = false;
        const passArray = i.toString(10).split('').map(Number);
    
        for (let j = 0; j < passArray.length; j++) {
            if (passArray[j] > passArray[j + 1]) {
                decrescents++;
            }
            if(passArray[j] === passArray[j + 1]) {
                sameAdjacents++;
            } else {
                if (sameAdjacents === 1) {
                    hasAdyacents = true;
                }
                sameAdjacents = 0;
            }
        }
        if (decrescents === 0 && hasAdyacents) {
            count++;
        }
    }
    return count;
}

console.log('Challenge 1 - Criteria count: ', countCriteria(356261, 846303));
console.log('Challenge 2 - Criteria count: ', countCriteria2(356261, 846303));
