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

export function addCardToDeck ({ question, title, startData }) {
  //need to use setItem to add a card, mergeItem is not working with iOS
  //adding question incl. answer to existing deck list dataset
  return AsyncStorage.setItem(CARD_DATA_STORAGE, JSON.stringify({
      ...startData,
      [title]: {
        ['questions']: [
        ...startData[title]['questions'],
        question,
      ],
      title: title,
    },
    }))
}

export function saveDeckTitle ({ title, startData }) {
  //spread existing data and add new title
  return AsyncStorage.setItem(CARD_DATA_STORAGE, JSON.stringify({
    ...startData,
    [title]: {
      questions: [],
      title: title,
    }
  }))
}
