import { ADD_CARD } from './addCardAction'

function addCard (state = {}, action) {

  switch (action.type) {
    case ADD_CARD :
      return {
        ...state,
        ...action.card
      }
    default :
      return state
  }
}

export default addCard
