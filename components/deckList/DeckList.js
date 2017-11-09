import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform, FlatList, Dimensions } from 'react-native'
import Modal from 'react-native-simple-modal';
import DeckEntry from './DeckEntry'
import { getAllDecks, saveDeckTitle } from '../../utils/cardApi'
import { setStartData, dataSelectDeckTitles } from '../../utils/_cardData'
import SelectButton from '../deck/SelectButton'
//TODO import AddDeckModal from './AddDeckModal'
import { connect } from 'react-redux'
import { allDecks } from './deckListAction'
import { yellowLight, white, orange, green, grey } from '../../utils/colors'

class DeckList extends Component {

  state = {open: false, deckName: ''}

  static navigationOptions = ({ navigation }) => {
    return { title: 'Mobile Flashcards' }
  }

  componentDidMount() {
    const start = setStartData() //TODO remove, or load just once
    getAllDecks().then((result) => {
      const { startData } = result
      this.props.allDecks({startData: startData})
    })
  }

  onPressItem(title, navigate) {
    navigate(
      'Deck',
      { title: title }
    )
  }

  onPressAddDeckTitle = () => {
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

  validate = (text) => {
    const letterNumber = /^[a-z\d\-_\s]+$/i
    return text.length === 0 || !text.match(letterNumber)
  }

  renderAddDeckButton = () => {
    const deviceWidth = Dimensions.get('window').width
    const inputError = this.validate(this.state.deckName)

    return (
      <View style={styles.button}>
        <SelectButton
          onPress={() => this.setState({open: true})}
          children={'Add Deck'}
          style={[{borderColor: orange}]}
        />

        <Modal
          open={this.state.open}
          modalDidClose={() => this.setState({open: false})}
          overlayBackground={white}
          style={{alignItems: 'center'}}
          containerStyle={{ justifyContent: 'flex-start' }}
        	modalStyle={styles.modalStyle} >

          <View>
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
                  children={'Add Deck'} >
                </SelectButton>
              : <SelectButton
                  style={[{backgroundColor: white}, {borderColor: white}]}
                  children={'Please add a deck title'} >
                </SelectButton>
            }
          </View>
        </Modal>
      </View>
    )
  }

  render() {
    const { startData } = this.props
    const listData = dataSelectDeckTitles(startData)

    return (
      <View style={styles.deckList}>
        { listData !== undefined &&
        <FlatList
          data = {listData}
          renderItem = {(({item}) =>
            <DeckEntry
              title={item.key}
              count={item.count}
              onPressItem={this.onPressItem}
              navigate={this.props.navigation.navigate}
            />
          )}
          ListFooterComponent={this.renderAddDeckButton}
        />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckList: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  button:{
    flex: 1,
    margin: 20,
  },
  modalStyle: {
     margin: 0,
     padding: 40,
     backgroundColor: white,
  },
})

function mapStateToProps (state) {
  return state.deckList
}


export default connect(
  mapStateToProps,
  { allDecks }
)(DeckList)
