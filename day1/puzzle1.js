const { input } = require('./input')


const lineArray = input.split('\n')
let calibrationValues = []

let sum = 0

lineArray.forEach(line => {
    const calibrationValue = getCalibrationValue(line)
    calibrationValues.push(calibrationValue)
})

calibrationValues.forEach(value => {
    const num = parseInt(value)
    sum += num
})

console.log(sum)

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