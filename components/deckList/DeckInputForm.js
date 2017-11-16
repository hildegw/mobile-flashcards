import React, { Component } from 'react'
import { View, TextInput, Text, StyleSheet, Dimensions } from 'react-native'
import { grey, greyLight, yellowLight, white, orange } from '../../utils/colors'
import SelectButton from '../deck/SelectButton'

class DeckInputForm extends Component {

//TODO remove this component and use InputText directlz in AddDeckTitle!!!!!

  state = { value: ' ' }

  validate = (text) => {
    return text.length < 3
  }

  handleSubmit = () => {
    //TODO hand back three values from each input
   const { value } = this.state
   this.props.onPress(value)
  }

  render () {
    const deviceWidth = Dimensions.get('window').width
    const inputError = this.validate(this.state.value)

    return (
      <View >
        <TextInput
          style={[styles.textInput, {width: deviceWidth-40}]}
          onChangeText={(value) => this.setState({value: value.trim()})}
          autoFocus={true}
          autoCapitalize={'words'}
          maxLength={50}
          placeholder={this.props.placeholder}
          selectTextOnFocus={true}
        />

        <Text style={styles.text}> {this.props.children} </Text>

        {!inputError && this.props.showButton &&
          <SelectButton
            onPress={this.handleSubmit}
            children={'Add'}
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
