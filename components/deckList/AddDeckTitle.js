import React, { Component } from 'react'
import { Modal, View, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks, saveDeckTitle } from '../../utils/cardApi'
import { grey, greyLight, yellowLight, white, orange } from '../../utils/colors'
import { allDecks } from './deckListAction'
import SelectButton from '../deck/SelectButton'

class AddDeckTitle extends Component {

  state = {open: true, deckName: ''}

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: 'Add a new Deck'}
  }

  validate = (text) => {
    return text.length < 3
  }

  onPressAddDeckTitle = () => {
    //this.refs.flatList.scrollToEnd()
    console.log('onPressAddDeckTitle, text', this.state.text)
    this.setState({open: false})
    const title = this.state.deckName
    //AsyncStorage mergeItem is not working on iOS, therefore handing over
    //original data set with all decks plus new questions to card API to setItem
    const { startData } = this.props
    const result = saveDeckTitle ({ title, startData })
    //update startData state property
    getAllDecks().then((result) => {
        this.props.allDecks({startData: result})
        })
  }


  render() {
    console.log('AddDeckTitle, renderr')
    const { navigate } = this.props.navigation
    const inputError = this.validate(this.state.deckName)

    return (
      <View style={styles.container}>

          <View style={styles.modalStyle}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 5}}
              onChangeText={(value) => this.setState({deckName: value.trim()})}
              autoFocus={true}
              autoCapitalize={'words'}
              maxLength={50}
              placeholder={'New Deck Title'}
              selectTextOnFocus={true}
            />

            {!inputError
              ? <SelectButton
                  onPress={() => this.onPressAddDeckTitle()}
                  children={'Add Deck'}
                  style={[{backgroundColor: white}, {borderColor: orange}]} >
                </SelectButton>
              : <SelectButton
                  style={[{backgroundColor: white}, {borderColor: white}]}
                  children={'Please add a deck title'} >
                </SelectButton>
            }
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
  },
  modalStyle: {
    margin: 10,
    marginTop: 80,
    padding: 0,
    backgroundColor: white,
  },
})

function mapStateToProps (state) {
  //const { decklist, allDecks } = state
  return state.deckList
}

export default connect(
  mapStateToProps,
  { allDecks }
)(AddDeckTitle)
