import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, FlatList, Dimensions } from 'react-native'
import Modal from 'react-native-simple-modal';
import DeckEntry from './DeckEntry'
import { getAllDecks, saveDeckTitle } from '../../utils/cardApi'
import { setStartData, dataSelectDeckTitles } from '../../utils/_cardData'
import SelectButton from '../deck/SelectButton'
import AddDeckModal from './AddDeckModal'
import { connect } from 'react-redux'
import { allDecks } from './deckListAction'
import { yellowLight, white, orange } from '../../utils/colors'

class DeckList extends Component {

  state = {open: false, offset: 0}

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

//TODO call from render via onPress={() => this.onPressAddDeckTitle()}
  onPressAddDeckTitle = () => {
    console.log('onPressAddDeckTitle, pressed')

    //TODO make modal visible, does not render when called here
      return (
        <View>

      </View>
      )


    /*
    const title = 'Udacity'

    //TODO open an edit modal and call action to add card

    //AsyncStorage mergeItem is not working on iOS, therefore handing over
    //original data set with all decks plus new questions to card API to setItem
    const { startData } = this.props
    const result = saveDeckTitle ({ title, startData })
    //update startData state property
    getAllDecks().then((result) => {
        this.props.allDecks({startData: result})
        })
    */
  }

  renderAddDeckButton = () => {
    const deviceWidth = Dimensions.get('window').width
    return (
      <View style={styles.button}>
        <SelectButton
          onPress={() => this.setState({open: true})}
          children={'New Deck'}
          style={[{borderColor: orange}]}
        />

        <Modal
          offset={this.state.offset}
          open={this.state.open}
          modalDidOpen={() => console.log('modal did open')}
          modalDidClose={() => this.setState({open: false})}
          style={{alignItems: 'center'}}>
          <View>
            <Text style={{fontSize: 20, marginBottom: 10}}>Hello world!</Text>
            <TouchableOpacity
            style={{margin: 5}}
            onPress={() => this.setState({offset: -100})}>
              <Text>Move modal up</Text>
            </TouchableOpacity>
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
})

function mapStateToProps (state) {
  return state.deckList
}


export default connect(
  mapStateToProps,
  { allDecks }
)(DeckList)
