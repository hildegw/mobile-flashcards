import { AsyncStorage } from 'react-native'

export const CARD_DATA_STORAGE = 'MobileFlashcardsData'

export function setStartData () {
  const startData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
  AsyncStorage.setItem(CARD_DATA_STORAGE, JSON.stringify({startData}))
  return startData
}
