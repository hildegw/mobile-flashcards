import { AsyncStorage } from 'react-native'
import { getStartData, CARD_DATA_STORAGE } from './_cardData'

//TODO: add delete?

export function getAllDecks () {
  return AsyncStorage.getItem(CARD_DATA_STORAGE)
    .then(console.log("getAll in cardAPI"))
}

export function getDeck (title) {
  return AsyncStorage.getItem(CARD_DATA_STORAGE, title)
    .then(
      //filter title data
      console.log("get one title in cardAPI")
    )
}

export function addCardToDeck ({ newCard, title }) {
  return AsyncStorage.mergeItem(CARD_DATA_STORAGE, JSON.stringify({
    title[questions].push(newCard) //TODO check, add newCard to array
  }))
}

export function saveDeckTitle ({ newTitle, allDecks }) {
  //spread existing data and add new title
  return AsyncStorage.setItem(CARD_DATA_STORAGE_KEY, JSON.stringify({
    ...allDecks,
    title: title
  }))
}
