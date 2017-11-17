import { AsyncStorage } from 'react-native'
import { getStartData, CARD_DATA_STORAGE } from './_cardData'

//TODO: add delete? getDeck?

//move to another util, to randomly select cards
function getRandomNumber (max) {
  return Math.floor(Math.random() * max) + 0
}

export function getAllDecks () {
  return AsyncStorage.getItem(CARD_DATA_STORAGE)
    .then((data) => {
      const parsedData = JSON.parse(data)
      return parsedData
    })
}

//TODO how to add to existing deck, call from Deck
export function addCardToDeck ({ card, deckTitle, startData }) {
  console.log('API add card:', card)
  //need to use setItem to add a card, mergeItem is not working with iOS
  //adding question incl. answer to existing deck list dataset
  return AsyncStorage.setItem(CARD_DATA_STORAGE, JSON.stringify({
      ...startData,
      [deckTitle]: {
        ...startData[deckTitle],
        },
        title: deckTitle,
    }))
}

export function addNewDeck ({ card, deckTitle, startData }) {
  console.log('API add new:', card)
  //need to use setItem to add a card, mergeItem is not working with iOS
  //adding question incl. answer to existing deck list dataset
  return AsyncStorage.setItem(CARD_DATA_STORAGE, JSON.stringify({
      ...startData,
      [deckTitle]: {
        questions: [card],
        title: deckTitle,
        }
    }))
}
