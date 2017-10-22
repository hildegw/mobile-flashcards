import { ADD_TO_SCORE } from './scoreAction'

function scoreReducer (state = {}, action) {
  let score = 0
  if (state.score !== undefined) score = state.score
  console.log('score reducer: state', state)
  switch (action.type) {
    case ADD_TO_SCORE :
      return {
        ...state,
        score: score + action.points,
      }
    default :
      return state
  }
}

export default scoreReducer
