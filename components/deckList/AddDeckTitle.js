import React, { Component } from 'react'
import { Modal, View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks, addNewDeck, addCardToDeck } from '../../utils/cardApi'
import { grey, greyLight, yellowLight, white, orange } from '../../utils/colors'
import { allDecks } from './deckListAction'
import SelectButton from '../deck/SelectButton'

class AddDeckTitle extends Component {

  state = { deckTitle: ' ', question: ' ', answer: ' ' }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: title }
  }

  validate = (text) => {
    return text.length < 3
  }

  onPressAddCard = () => {
    /* AsyncStorage mergeItem is not working on iOS, therefore handing over
      original data set with all decks plus new questions to card API to setItem */
    const { title } = this.props.navigation.state.params //TODO decide if deck is selected or new
    this.setState({ deckTitle: title })
    const { startData } = this.props
    const { deckTitle, question, answer } = this.state
    const card = { question: question, answer: answer }
    title === 'Add a new Deck' ? addNewDeck ({ card, deckTitle, startData}) : addCardToDeck ({ card, deckTitle, startData })
    //update startData state property
    getAllDecks().then((result) => {
        this.props.allDecks({startData: result})
        console.log('updated Decks in AddDeckTitle: ', result)
        })
    this.props.navigation.goBack()
  }

//TODO: prepopulate fields if available - make a list of available decks
//TODO: add another button to add more

  render() {
    const deviceWidth = Dimensions.get('window').width
    const inputError = this.validate(this.state.deckTitle)

    return (
      <View style={styles.container}>

        <TextInput
          style={[styles.textInput, {width: deviceWidth-40}]}
          onChangeText={(value) => this.setState({deckTitle: value.trim()})}
          autoFocus={true}
          autoCapitalize={'words'}
          maxLength={50}
          placeholder={'new deck title'}
          selectTextOnFocus={true}
        />

        <Text style={styles.text}> 'Add a new deck title'</Text>

        <TextInput
          style={[styles.textInput, {width: deviceWidth-40}]}
          onChangeText={(value) => this.setState({question: value.trim()})}
          autoFocus={true}
          autoCapitalize={'words'}
          maxLength={50}
          placeholder={'new question'}
          selectTextOnFocus={true}
        />

        <Text style={styles.text}> 'Add a new question to deck'</Text>

        <TextInput
          style={[styles.textInput, {width: deviceWidth-40}]}
          onChangeText={(value) => this.setState({answer: value.trim()})}
          autoFocus={true}
          autoCapitalize={'words'}
          maxLength={50}
          placeholder={'new answer'}
          selectTextOnFocus={true}
        />

        <Text style={styles.text}> 'Add a new answer to question'</Text>

        {!inputError &&
          <SelectButton
            onPress={() => this.onPressAddCard()}
            children={'Add'}
            style={[{borderColor: orange}, {width: 140}, {backgroundColor: 'transparent'}]} >
          </SelectButton>
        }

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
  textInput: {
    margin: 5,
    marginBottom: 10,
    padding: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  text: {
    color: grey,
    fontSize: 16,
    textAlign: 'justify',
    fontWeight: 'bold',
    paddingLeft: 5,
  }
})

function mapStateToProps (state) {
  return state.deckList
}

export default connect(
  mapStateToProps,
  { allDecks }
)(AddDeckTitle)
