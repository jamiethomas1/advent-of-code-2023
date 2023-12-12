const { input } = require('./input')

/**
 * Modify getSurroundingChars to make surroundingChars a property of the number object
 * Loop through all number objects
 * Build a new array of number objects where surroundingChars contains a *, include coordinates of that/those *(s) as property of number
 * May need to give number object an ID property to keep track (rather than having to worry about coordinates)
 * Loop through gearCoords array, for each element, loop through entire gearNumbers array and find the two numbers whose surroundingChars array includes a char with that set of coordinates. Should be exactly two every time.
 * In each loop of the preceding step, remove the two number objects from gearNumbers array, and push to new gearRatios array
 * Loop through gearRatios array and multiply the first number by the second number, and find the sum of these products
 */

const lines = input.split('\n')
var chars = [] // 2D array of chars, [y][x]

lines.forEach(line => {
    const lineChars = line.split('')
    chars.push(lineChars)
})

const allNumberObjs = getAllNumberObjs(chars)
let starNumbers = []
let gearCoords = []

allNumberObjs.forEach(numberObj => {
    if (isNear(numberObj, "*")) starNumbers.push(numberObj)
})

starNumbers.forEach(numberObj => {
    let gearObj = {}

    if (numberObj.value == "688") {
        console.log("")
    }

    for (character of numberObj.surroundingChars) {
        if (character.value == "*") { // Check if starSurround has 2 numbers
            let starSurround = getSurroundingChars(character)
            let numArray = []
            


            // if (starSurround.filter(char => isNumber(char.value)).length == 2) { // if the * is connected to exactly two numbers
            //     gearObj = character
            //     gearCoords.push(gearObj.coords)
            //     break
            // }
        }
    }
})

console.log(gearCoords.length)

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
                numberObj.surroundingChars = getSurroundingChars(numberObj)
                allNumberObjs.push(numberObj) // push to function's array
                numberObj = {value: "", coords: []} // reset temp variable
            }
        }
    }

    return allNumberObjs
}

function isNearAsterix(numberObj) {
    for (const char of numberObj.surroundingChars) {
        if (char.value == '*') return true
    }

    return false
}

function isNear(charObj, target) {
    for (const char of charObj.surroundingChars) {
        if (char.value == target) return true
    }

    return false
}

function isNearNumber(charObj) {
    
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
function getSurroundingChars(numberObj) {
    let value = numberObj.value
    let length = value.length
    let coords = numberObj.coords // Coordinates of first digit

    let surroundingChars = []

    // Get first column - if statements check if number is on edge - not fully surrounded
    if (coords[0] > 0 && coords[1] > 0) surroundingChars.push({value: chars[coords[0] - 1][coords[1] - 1], coords: [coords[0] - 1, coords[1] - 1]}) // top left
    if (coords[1] > 0) surroundingChars.push({value: chars[coords[0]][coords[1] - 1], coords: [coords[0], coords[1] - 1]}) // middle left
    if (coords[1] > 0 && coords[0] < 139) surroundingChars.push({value: chars[coords[0] + 1][coords[1] - 1], coords: [coords[0] + 1, coords[1] - 1]}) // bottom left

    // Get middle column(s)
    for (let i = 0; i < length; i++) {
        if (coords[0] > 0) surroundingChars.push({value: chars[coords[0] - 1][coords[1] + i], coords: [coords[0] - 1, coords[1] + i]}) // top middle
        if (coords[0] < 139) surroundingChars.push({value: chars[coords[0] + 1][coords[1] + i], coords: [coords[0] + 1, coords[1] + i]}) // bottom middle
    }

    // Get last column
    if (coords[1] < (139 - length) && coords[0] > 0) surroundingChars.push({value: chars[coords[0] - 1][coords[1] + length], coords: [coords[0] - 1, coords[1] + length]}) // top right
    if (coords[1] < (139 - length)) surroundingChars.push({value: chars[coords[0]][coords[1] + length], coords: [coords[0], coords[1] + length]}) // middle right
    if (coords[1] < (139 - length)  && coords[0] < 139) surroundingChars.push({value: chars[coords[0] + 1][coords[1] + length], coords: [coords[0] + 1, coords[1] + length]}) // bottom right

    return surroundingChars
}