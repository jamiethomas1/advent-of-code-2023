const { input } = require('./input')

/**
 * Parse engine schematic into 2D char array
 * Loop through each character calling parseInt and Number.isNaN
 * When a number is found, get the length, and coordinates of its first digit
 * Make a function that returns all of the array indices around a number
 * Pass object of {number: 42, coords: [11, 35]} into function, get array of coordinates back
 * Loop through array of coordinates to check for symbols (anything not a number or a dot)
 * If symbol detected, pass to final array of numbers
 * Sum final array to get answer
 */

const lines = input.split('\n')
var chars = [] // 2D array of chars, [y][x]

lines.forEach(line => {
    const lineChars = line.split('')
    chars.push(lineChars)
})

const allNumberObjs = getAllNumberObjs(chars)
let partNumbers = []

let sumOfPartNumbers = 0

allNumberObjs.forEach(number => {
    if (isPartNumber(number)) partNumbers.push(parseInt(number.value))
})

partNumbers.forEach(number => sumOfPartNumbers += number)

console.log(sumOfPartNumbers)

function getAllNumberObjs(chars) {
    let allNumberObjs = []
    let numberObj = {value: "", coords: []}

    for (let i = 0; i < chars.length; i++) { // looping through lines
        for (let j = 0; j < chars[i].length; j++) { // looping through chars in line
            if (isNumber(chars[i][j])) {
                numberObj.value += chars[i][j] // append current digit to current temp numberObj value
                numberObj.coords = [i,j] // update temp numberObj value with current coordinates
            } else if (numberObj.value != "") { // if current char not a number but a temp numberObj is stored
                numberObj.coords[1] -= (numberObj.value.length - 1) // reset coordinates to start of number
                allNumberObjs.push(numberObj) // push to function's array
                numberObj = {value: "", coords: []} // reset temp variable
            }
        }
    }
    return allNumberObjs
}

function isPartNumber(number) {
    const surroundingChars = getSurroundingChars(number)

    for (const char of surroundingChars) {
        if (char != '.') return true
    }

    return false
}

function isNumber(char) {
    return !(Number.isNaN(parseInt(char)))
}

/**
 * Need to search all the indices with dots
 * 
 *      .....   ...     ....
 *      .123.   .4.     .56.
 *      .....   ...     ....
 */
function getSurroundingChars(number) {
    let value = number.value
    let length = value.length
    let coords = number.coords // Coordinates of first digit

    let surroundingChars = []

    // Get first column - if statements check if number is on edge - not fully surrounded
    if (coords[0] > 0 && coords[1] > 0) surroundingChars.push(chars[coords[0] - 1][coords[1] - 1]) // top left
    if (coords[1] > 0) surroundingChars.push(chars[coords[0]][coords[1] - 1]) // middle left
    if (coords[1] > 0 && coords[0] < 139) surroundingChars.push(chars[coords[0] + 1][coords[1] - 1]) // bottom left

    // Get middle column(s)
    for (let i = 0; i < length; i++) {
        if (coords[0] > 0) surroundingChars.push(chars[coords[0] - 1][coords[1] + i]) // top middle
        if (coords[0] < 139) surroundingChars.push(chars[coords[0] + 1][coords[1] + i]) // bottom middle
    }

    // Get last column
    if (coords[1] < (139 - length) && coords[0] > 0) surroundingChars.push(chars[coords[0] - 1][coords[1] + length]) // top right
    if (coords[1] < (139 - length)) surroundingChars.push(chars[coords[0]][coords[1] + length]) // middle right
    if (coords[1] < (139 - length)  && coords[0] < 139) surroundingChars.push(chars[coords[0] + 1][coords[1] + length]) // bottom right

    return surroundingChars
}