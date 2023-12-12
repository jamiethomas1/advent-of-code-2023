const { input } = require('./input')

/**
 * 
 */

const lines = input.split('\n')
const cardArray = []
let totalCards = 0

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

    cardArray.push({id: id, count: 1, winningNumbers: winningNumbers, cardNumbers: cardNumbers})
})

cardArray.forEach((card, index, array) => {
    let matchCount = getMatchCount(card)

    for (let i = 1; i <= card.count; i++) {
        for (let j = index + 1; j <= index + matchCount; j++) {
            array[j].count++
        }
    }
    totalCards += card.count
})

console.log(totalCards)

function getMatchCount(card) {
    return card.cardNumbers.filter(number => card.winningNumbers.includes(number)).length
}

function isNumber(character) {
    if (!isNaN(parseInt(character))) return true
    return false
}