const { input } = require('./input')

/**
 * Get minimum set for each game
 * Parse count integers * multiply together
 * Sum these results
 * 
 * Getting minimum set:
 * Maintain maxRed, maxGreen, and maxBlue variables initialised to 0
 * Loop through sets, parse integers & add to max value if greater than existing max value
 * Return object of red, green, and blue max values
 */

const games = input.split('\n')
let sumOfPowers = 0

games.forEach(game => {
    let gameObj = parseGame(game)
    gameObj.minSet = getMinSet(gameObj)
    let minSetPower = getPower(gameObj.minSet)
    sumOfPowers += minSetPower
})

console.log(sumOfPowers)

/**
 * Returns game object of structure:
 * {
 *  id: 1,
 *  sets: [[{count: 10, colourVal: "green"}, {count: 9, colourVal: "blue"}, {count: 1, colourVal: "red"}],
 *         [{count: 1, colourVal: "red"}, {count: 7, colourVal: "green"}]]
 * }
 */
function parseGame(game) {
    let gameObj = {}
    gameObj.id = parseInt(game.substring(5, game.indexOf(':')))
    gameObj.sets = []
    let setsString = game.slice(game.indexOf(':') + 2)
    let setsArray = setsString.split('; ')
    setsArray.forEach(set => {
        let coloursArray = set.split(', ')
        let colourObjArray = []
        coloursArray.forEach(colour => {
            let colourObj = {
                count: parseInt(colour.substring(0, colour.indexOf(' '))),
                colourVal: colour.substring(colour.indexOf(' ') + 1)
            }
            colourObjArray.push(colourObj)
        })
        gameObj.sets.push(colourObjArray)
    })
    return gameObj
}

function getMinSet(gameObj) {
    let maxRed = 0, maxGreen = 0, maxBlue = 0
    gameObj.sets.forEach(set => {
        set.forEach(colourObj => {
            switch (colourObj.colourVal) {
                case "red": 
                    maxRed = (colourObj.count > maxRed ? colourObj.count : maxRed)
                    break
                case "green":
                    maxGreen = (colourObj.count > maxGreen ? colourObj.count : maxGreen)
                    break
                case "blue":
                    maxBlue = (colourObj.count > maxBlue ? colourObj.count : maxBlue)
                    break
                default: 
                    throw new Error("Invalid colour string")
            }
        })
    })

    return [{count: maxRed, colourVal: "red"}, {count: maxGreen, colourVal: "green"}, {count: maxBlue, colourVal: "blue"}]
}

function getPower(set) {
    let result = 1 // Not multiplying by 0
    set.forEach(colourObj => {
        result *= colourObj.count
    })
    return result
}