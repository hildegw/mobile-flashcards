export const SELECTED_CARD = 'SELECTED_CARD'

export function selectedCard (card) {
  console.log('selectedCardAction card:', card)

  return {
    type: SELECTED_CARD,
    card,
  }
}
