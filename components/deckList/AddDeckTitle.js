import React, { Component } from 'react'
import { Modal, View, Text, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks, saveDeckTitle } from '../../utils/cardApi'
import { grey, greyLight, yellowLight, white, orange } from '../../utils/colors'
import { allDecks } from './deckListAction'
import DeckInputForm from './DeckInputForm'
import SelectButton from '../deck/SelectButton'

class AddDeckTitle extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: 'Add a new Deck'}
  }

  onPressAddDeckTitle = (title) => {
    //AsyncStorage mergeItem is not working on iOS, therefore handing over
    //original data set with all decks plus new questions to card API to setItem
    const { startData } = this.props
    const result = saveDeckTitle ({ title, startData })
    //update startData state property
    getAllDecks().then((result) => {
        this.props.allDecks({startData: result})
        })
    this.props.navigation.goBack()
  }


  render() {
    console.log('AddDeckTitle, renderr')
    const deviceWidth = Dimensions.get('window').width

    return (
      <View style={styles.container}>
        <DeckInputForm
          onPress={this.onPressAddDeckTitle}
          children={'Add Deck'} >
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
  //const { decklist, allDecks } = state
  return state.deckList
}

export default connect(
  mapStateToProps,
  { allDecks }
)(AddDeckTitle)
