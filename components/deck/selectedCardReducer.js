import { SELECTED_CARD } from './selectedCardAction'

function selectedCardReducer (state = {}, action) {
  console.log('selectedCardReducer SELECTED_CARD', action.card)

  switch (action.type) {
    case SELECTED_CARD :
      return {
        ...state,
        ...action.card,
      }
    default :
      return state
  }
}

export default selectedCardReducer
