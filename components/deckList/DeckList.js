import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, FlatList } from 'react-native'
//import { Ionicons } from '@expo/vector-icons'
import DeckEntry from './DeckEntry'
import { getAllDecks } from '../../utils/cardApi'
import { setStartData } from '../../utils/_cardData'
import { connect } from 'react-redux'
import { allDecks } from './deckListAction'
import { yellowLight, white } from '../../utils/colors'
//import { NavigationActions } from 'react-navigation'

class DeckList extends Component {

  componentDidMount() {
    const start = setStartData() //TODO remove, or load just once
    getAllDecks().then((result) => {
      const { startData } = result
      //console.log('Deck didMount: ',  startData['React']['questions'].length)
      this.props.allDecks({startData: startData})
    })
  }

  objToArray () {
    const { startData } = this.props
    const listData = []
    if (startData !== undefined) {
      Object.keys(startData).map((title) => {
        let count = startData[title]['questions'].length
        listData.push({ 'key': title, 'count': count })
      })
    }
    return listData
  }

  _keyExtractor = (item, title) => item.title;

  render() {
    const { startData } = this.props
    const listData = this.objToArray()
    const test = [{ 'React': 'abc' }, { 'Redux': 'abc' }, ]
    console.log('DeckList render, startData:', startData)

    return (
      <View style={styles.deckList}>
        { listData !== undefined &&
        <FlatList
          data = {listData}
          renderItem = {(({item}) =>
            <DeckEntry title={item.key} count={item.count}  />
          )}
        />}



      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckList: {
    flex: 1,
    padding: 40,
    justifyContent: 'flex-start',
  },
  deckListItem: {
    marginBottom: 1,
  },
})

function mapStateToProps (state) {
  return state
}


export default connect(
  mapStateToProps,
  { allDecks }
)(DeckList)
