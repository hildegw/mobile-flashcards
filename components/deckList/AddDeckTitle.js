import React, { Component } from 'react'
import { Modal, View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks, addDeckAndCard } from '../../utils/cardApi'
import { grey, greyLight, yellowLight, white, orange } from '../../utils/colors'
import { allDecks } from './deckListAction'
import SelectButton from '../deck/SelectButton'

const ADD_DECK = 'Add a new Deck'

class AddDeckTitle extends Component {

  state = {
    deckTitle: '',
    question: '',
    answer: ''
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: title }
  }

  componentDidMount () {
    const { title } = this.props.navigation.state.params
    if (title !== ADD_DECK) this.setState({ deckTitle: title })
    //TODO get deck title from navigation! Again!
  }

  onPressAddCard = () => {
    /* AsyncStorage mergeItem is not working on iOS, therefore handing over
      original data set with all decks plus new questions to card API to setItem */
    const { startData } = this.props
    const { deckTitle, question, answer } = this.state
    const card = { question: question, answer: answer }
    addDeckAndCard ({ card, deckTitle, startData })
    //update startData state property
    getAllDecks().then((result) => {
        this.props.allDecks({startData: result})
        console.log('updated Decks in AddDeckTitle: ', result)
        })
    this.props.navigation.goBack()
  }

//TODO: prepopulate fields if available - make a list of available decks
//TODO: add another button to add more
//TODO: check for unknown deck title when calling "addCard"

  render() {
    const deviceWidth = Dimensions.get('window').width
    const { deckTitle } = this.state
    return (
      <View style={styles.container}>

        <TextInput
          style={[styles.textInput, {width: deviceWidth-40}]}
          value={deckTitle}
          onChangeText={(value) => this.setState({deckTitle: value.trim()})}
          autoFocus={true}
          autoCapitalize={'words'}
          maxLength={50}
          placeholder={'new deck title'}
        />

        <Text style={styles.text}> Add a new deck</Text>

        <TextInput
          style={[styles.textInput, {width: deviceWidth-40}, {height: 120}]}
          onChangeText={(value) => this.setState({question: value.trim()})}
          multiline={true}
          placeholder={'new question'}
          selectTextOnFocus={true}
        />

        <Text style={styles.text}> Add a new question</Text>

        <TextInput
          style={[styles.textInput, {width: deviceWidth-40}, {height: 120}]}
          onChangeText={(value) => this.setState({answer: value.trim()})}
          multiline={true}
          placeholder={'new answer'}
          selectTextOnFocus={true}
        />

        <Text style={styles.text}> Add a new answer</Text>

        <SelectButton
          onPress={() => this.onPressAddCard()}
          children={'Add'}
          style={[{borderColor: orange}, {width: 140}, {backgroundColor: 'transparent'}]} >
        </SelectButton>

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
    fontSize: 16,
  },
  text: {
    color: grey,
    fontSize: 16,
    textAlign: 'justify',
    paddingLeft: 5,
    marginBottom: 20,
  }
})

function mapStateToProps (state) {
  return state.deckList
}

export default connect(
  mapStateToProps,
  { allDecks }
)(AddDeckTitle)
