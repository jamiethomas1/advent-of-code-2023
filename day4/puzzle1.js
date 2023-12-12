const { input } = require('./input')

/**
 * DONE: Create array of card objects { id: 1, winningNumbers: [int], cardNumbers: [int]} 
 * DONE: Loop through array, call new function getCardValue(card), increment totalPoints
 * DONE: getCardValue(card): filter cardNumbers by winningNumbers, length of result is number of winning numbers. Return 2^(result - 1)
 */

const lines = input.split('\n')
const cardArray = []
let totalPoints = 0

// Parse lines into card objects and push into cardArray[]
lines.forEach(line => {
    let id = parseInt(line.substring(5, line.indexOf(':')))
    let winningNumbersString = line.substring(line.indexOf(':') + 2, line.indexOf('|') - 1)
    let cardNumbersString = line.substring(line.indexOf('|') + 2)
    
    let winningNumbersStrArray = winningNumbersString.split(" ")
    let cardNumbersStrArray = cardNumbersString.split(" ")

    let winningNumbers = []
    let cardNumbers = []
    
    winningNumbersStrArray.forEach(strNum => {
        if (isNumber(strNum.trim())) winningNumbers.push(parseInt(strNum.trim()))
    })
    cardNumbersStrArray.forEach(strNum => {
        if (isNumber(strNum.trim())) cardNumbers.push(parseInt(strNum.trim()))
    })

    cardArray.push({id: id, winningNumbers: winningNumbers, cardNumbers: cardNumbers})
})

cardArray.forEach(card => {
    totalPoints += getCardValue(card)
})

console.log(totalPoints)

function getCardValue(card) {
    let winCount = card.cardNumbers.filter(number => card.winningNumbers.includes(number)).length
    if (winCount) return 2 ** (winCount - 1) // First win is worth 1 point (or 2^0) so exponent must be decremented by 1

    return 0
}

function isNumber(character) {
    if (!isNaN(parseInt(character))) return true
    return false
}