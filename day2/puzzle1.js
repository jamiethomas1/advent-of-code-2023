const { input } = require('./input')

/**
 * Make global sumOfIDs variable
 * Make array of lines
 * Loop through lines
 * For each line, call isPossible(line)
 * If line is possible, extract game ID & increment sumOfIDs
 */

const games = input.split('\n')
var sumOfIDs = 0

const RED_MAX = 12, GREEN_MAX = 13, BLUE_MAX = 14

var possibleGames = []

games.forEach(game => {
    let gameObj = parseGame(game)
    if (isPossible(gameObj)) possibleGames.push(gameObj)
})

possibleGames.forEach(game => {
    sumOfIDs += game.id
})

console.log(sumOfIDs)

function parseGame(game) {
    let gameObj = {}
    gameObj.id = parseInt(game.substring(5, game.indexOf(':')))
    gameObj.sets = []
    let setsString = game.slice(game.indexOf(':') + 2)
    let setsArray = setsString.split('; ')
    setsArray.forEach(set => {
        let coloursArray = set.split(', ')
        gameObj.sets.push(coloursArray)
    })
    return gameObj
}

function isPossible(gameObj) {
    let setsArray = gameObj.sets
    let possible = true
    setsArray.forEach(set => {
        set.forEach(colour => {
            let colourObj = {
                count: parseInt(colour.substring(0, colour.indexOf(' '))),
                colourVal: colour.substring(colour.indexOf(' ') + 1)
            }
            if (colourObj.colourVal == "red" && colourObj.count > RED_MAX) possible = false
            if (colourObj.colourVal == "green" && colourObj.count > GREEN_MAX) possible = false
            if (colourObj.colourVal == "blue" && colourObj.count > BLUE_MAX) possible = false
        })
    })
    return possible
}