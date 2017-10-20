import { ALL_DECKS, ADD_ENTRY } from './deckListAction'

function entries (state = {}, action) {
  console.log('deckListReducer ALL_DECKS', action.allDecks)

  switch (action.type) {
    case ALL_DECKS :
    return {
        ...state,
        ...action.allDecks,
      }
    case ADD_ENTRY :
      return {
        ...state,
        ...action.entry
      }
    default :
      return state
  }
}

export default entries
