import React, { Component } from 'react'
import { View, TextInput, Text, StyleSheet, Dimensions } from 'react-native'
import { grey, greyLight, yellowLight, white, orange } from '../../utils/colors'
import SelectButton from '../deck/SelectButton'

class DeckInputForm extends Component {

  state = { deckName: ' ' }

  validate = (text) => {
    return text.length < 3
  }

handleSubmit = () => {
 title = this.state.deckName
 this.props.onPress(title)
}

  render () {
    const deviceWidth = Dimensions.get('window').width
    const inputError = this.validate(this.state.deckName)

    return (
      <View >
        <TextInput
          style={[styles.textInput, {width: deviceWidth-40}]}
          onChangeText={(value) => this.setState({deckName: value.trim()})}
          autoFocus={true}
          autoCapitalize={'words'}
          maxLength={50}
          placeholder={'New Deck Title'}
          selectTextOnFocus={true}
        />

        <Text style={styles.text}> {this.props.children} </Text>

        {!inputError &&
          <SelectButton
            onPress={this.handleSubmit}
            children={'Add Deck'}
            title={this.state.deckName}
            style={[{borderColor: orange}, {width: 140}, {backgroundColor: 'transparent'}]} >
          </SelectButton>
        }
      </View>
  )}
}

const styles = StyleSheet.create({
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

export default DeckInputForm
