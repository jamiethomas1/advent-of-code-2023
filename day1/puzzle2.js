const { input } = require('./input')


const lineArray = input.split('\n')
let calibrationValues = []

let sum = 0

lineArray.forEach(line => {
    line = replaceWords(line)
    const calibrationValue = getCalibrationValue(line)
    calibrationValues.push(calibrationValue)
})

replaceWords(lineArray[8])

calibrationValues.forEach(value => {
    const num = parseInt(value)
    sum += num
})

console.log(sum)

function replaceWords(line) {
    /**
     * Need to loop through and first *find* first and last instance of a written number
     * Put into array of objects of {word, index}
     * Don't use String.replace() as word may repeat
     * String operations on line using data from array of objects
     * Cases to consider: 'fiveight', 'onejfgd3twothreeight5'
     */

    let newLine = line
    const pattern = /(?=(one|two|three|four|five|six|seven|eight|nine))/g
    let result = [...line.matchAll(pattern)]
    for (let i = result.length - 1; i >= 0; i--) {
        newLine = newLine.slice(0, result[i].index) + getNum(result[i][1]) + newLine.slice(result[i].index)
    }
    return newLine
}

function getNum(line) {
    switch (line) {
        case 'one': return 1;
        case 'two': return 2;
        case 'three': return 3;
        case 'four': return 4;
        case 'five': return 5;
        case 'six': return 6;
        case 'seven': return 7;
        case 'eight': return 8;
        case 'nine': return 9;
        default: return -1;
    }
}

function getCalibrationValue(line) {
    let digitArray = []

    line = line.split('')

    line.forEach(char => {
        if (isDigit(char)) digitArray.push(char)
    })

    if (digitArray.length == 1) digitArray.push(digitArray[0])
    else if (digitArray.length > 2) digitArray = [digitArray[0], digitArray[digitArray.length - 1]]
    else if (digitArray.length != 2) throw new Error("No numbers in line " + line)

    let result = digitArray.join("")
    return result
}

function isDigit(character) {
    const pattern = /\d/
    return pattern.test(character)
}