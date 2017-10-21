export const SELECT_CARD = 'SELECT_CARD'

export function selectCard (card) {
  //console.log('selectedCardAction card:', card)

  return {
    type: SELECT_CARD,
    card,
  }
}
