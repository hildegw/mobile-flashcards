import React, { Component } from 'react'
import { Modal, View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks, saveDeckTitle, addCardToDeck } from '../../utils/cardApi'
import { grey, greyLight, yellowLight, white, orange } from '../../utils/colors'
import { allDecks } from './deckListAction'
import SelectButton from '../deck/SelectButton'

class AddDeckTitle extends Component {

  state = { value: ' ' }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: title}
  }

  validate = (text) => {
    return text.length < 3
  }

//TODO: combine onPressAddCard and onPressAddDeckTitle, just one button
  onPressAddCard = () => {
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
    const title = this.state.value
    //let result = addCardToDeck ({ question, title, startData })
    let result = saveDeckTitle ({ title, startData })
    //update startData state property
    getAllDecks().then((result) => {
        this.props.allDecks({startData: result})
        })
    this.props.navigation.goBack()
  }

//TODO: set state with all three values and add to database
//TODO: prepopulate fields if available

  render() {
    const deviceWidth = Dimensions.get('window').width
    const inputError = this.validate(this.state.value)

    return (
      <View style={styles.container}>

        <TextInput
          style={[styles.textInput, {width: deviceWidth-40}]}
          onChangeText={(value) => this.setState({value: value.trim()})}
          autoFocus={true}
          autoCapitalize={'words'}
          maxLength={50}
          placeholder={'new deck title'}
          selectTextOnFocus={true}
        />

        <Text style={styles.text}> 'Add a new deck title'</Text>

        <TextInput
          style={[styles.textInput, {width: deviceWidth-40}]}
          onChangeText={(value) => this.setState({value: value.trim()})}
          autoFocus={true}
          autoCapitalize={'words'}
          maxLength={50}
          placeholder={'new question'}
          selectTextOnFocus={true}
        />

        <Text style={styles.text}> 'Add a new question to deck'</Text>

        <TextInput
          style={[styles.textInput, {width: deviceWidth-40}]}
          onChangeText={(value) => this.setState({value: value.trim()})}
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
