import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, FlatList } from 'react-native'
//import { Ionicons } from '@expo/vector-icons'
import DeckEntry from './DeckEntry'
import { getAllDecks } from '../../utils/cardApi'
import { setStartData, objToArray } from '../../utils/_cardData'
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

  onPressItem(title, navigate) {
    //console.log('Decklist render, navigate:', navigate)
    navigate(
      'Deck',
      { title: title }
    )
    console.log('Decklist:', title)
  }

  render() {
    const { startData } = this.props
    const listData = objToArray(startData)

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
})

function mapStateToProps (state) {
  //console.log('mapStateToProps', state)
  return state
}


export default connect(
  mapStateToProps,
  { allDecks }
)(DeckList)
