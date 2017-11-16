import React, { Component } from 'react'
import { Modal, View, Text, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks, saveDeckTitle, addCardToDeck } from '../../utils/cardApi'
import { grey, greyLight, yellowLight, white, orange } from '../../utils/colors'
import { allDecks } from './deckListAction'
import DeckInputForm from './DeckInputForm'
import SelectButton from '../deck/SelectButton'

class AddDeckTitle extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: title}
  }

//TODO: combine onPressAddCard and onPressAddDeckTitle, just one button
  onPressAddCard = (title) => {
    console.log('onPressAddCard, title-value', title)
    const question =
            {
              question: 'What is a Flatlist?',
              answer: 'A scrollable list view based on react-native ListView'
            }

    //TODO open an edit modal and call action to add card

    //AsyncStorage mergeItem is not working on iOS, therefore handing over
    //original data set with all decks plus new questions to card API to setItem
    const { startData } = this.props
    let result = addCardToDeck ({ question, title, startData })
    // result = saveDeckTitle ({ title, startData })
    //update startData state property
    getAllDecks().then((result) => {
        this.props.allDecks({startData: result})
        })
    this.props.navigation.goBack()
  }

//TODO: ?? add global state for formIsEditable, set when clicking add deck or add button
//TODO: add global state for deckSelected, to show in Form

  render() {
    const deviceWidth = Dimensions.get('window').width

    return (
      <View style={styles.container}>
        <DeckInputForm
          showButton={false}
          children={'Add a new deck title'}
          placeholder={'new deck title'} >
        </DeckInputForm>

        <DeckInputForm
          showButton={false}
          children={'Add a new question to the deck'}
          placeholder={'new question'} >
        </DeckInputForm>

        <DeckInputForm
          showButton={true}
          onPress={this.onPressAddCard}
          children={'Add a new answer to the deck'}
          placeholder={'new answer'} >
        </DeckInputForm>
      </View>

  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: yellowLight,
    padding: 20,
  },
})

function mapStateToProps (state) {
  return state.deckList
}

export default connect(
  mapStateToProps,
  { allDecks }
)(AddDeckTitle)
