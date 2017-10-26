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
      console.log('cardAPI getAllDecks:', parsedData)
      return parsedData
    })
}

export function addCardToDeck ({ newCard, title }) {
  return AsyncStorage.mergeItem(CARD_DATA_STORAGE, JSON.stringify(
    title['questions'].push(newCard)
  ))
}

export function saveDeckTitle ({ newTitle, allDecks }) {
  //spread existing data and add new title
  return AsyncStorage.setItem(CARD_DATA_STORAGE_KEY, JSON.stringify({
    ...allDecks,
    title: title
  }))
}
