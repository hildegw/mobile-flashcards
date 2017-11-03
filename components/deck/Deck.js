import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { grey, greyLight, yellowLight, white, orange } from '../../utils/colors'
import { dataSelectDeck } from '../../utils/_cardData'
import { addCardToDeck, getAllDecks } from '../../utils/cardApi'
import Score from './Score'
import SelectButton from './SelectButton'
import { scoreCounter } from './scoreAction'
import { allDecks } from '../deckList/deckListAction'

class Deck extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: title + ' Deck'}
  }

  componentDidMount() {
    //reset score counter in store
    this.props.scoreCounter(0)
  }

  onPressAddCard (title) {
    const question =
            {
              question: 'What is a Flatlist?',
              answer: 'A scrollable list view based on react-native ListView'
            }

    //TODO open an edit modal and call action to add card
    
    //AsyncStorage mergeItem is not working on iOS, therefore handing over
    //original data set with all decks plus new questions to card API to setItem
    const { startData } = this.props
    const result = addCardToDeck ({ question, title, startData })
    //update startData state property
    getAllDecks().then((result) => {
          this.props.allDecks({startData: result})
        })
  }

  render() {
    const { startData } = this.props
    const { title } = this.props.navigation.state.params
    const selectedDeck = dataSelectDeck(startData, title)
    const numberOfQuestions = selectedDeck['questions'].length
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <Text style={[styles.text, {fontSize: 32}, {fontWeight: 'bold'}]} >
          {selectedDeck.title}
        </Text>
        {numberOfQuestions === 1
          ?   <Text style={styles.text}>
                {numberOfQuestions} card
              </Text>
          :   <Text style={styles.text}>
                {numberOfQuestions} cards
              </Text>
        }

        <Score numberOfQuestions={numberOfQuestions} />

        <View style={styles.buttonsInRow} >
          <SelectButton
            onPress={() => this.onPressAddCard(title)}
            children={'Add Card'}
          />

          <SelectButton
            onPress={() => navigate(
              'CardList',
              { title: selectedDeck.title }
            )}
            children={'Start Quiz'}
            style={[{borderColor: orange}]}
          />
        </View>
      </View>

  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: yellowLight,
    padding: 20,
    paddingTop: 60,
  },
  text: {
    fontSize:20,
    color: grey,
    paddingTop: 10,
  },
  buttonsInRow:{
    flexDirection: 'row',
    margin: 40,
  }
})

function mapStateToProps (state) {
  //const { decklist, allDecks } = state
  return state.deckList
}

export default connect(
  mapStateToProps,
  { scoreCounter, allDecks }
)(Deck)
