import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
//import { Ionicons } from '@expo/vector-icons'
import DeckEntry from './DeckEntry'
import { getAllDecks } from '../../utils/cardApi'
import { setStartData } from '../../utils/_cardData'
import { connect } from 'react-redux'
import { allDecks } from './deckListAction'
import { yellowLight, white } from '../../utils/colors'
//import { NavigationActions } from 'react-navigation'

class DeckList extends Component {
  state = {
    startData: null,
  }

  componentDidMount() {
    const start = setStartData() //TODO remove, or load just once
    getAllDecks().then((result) => {
      const { startData } = result
      //console.log('Deck render, result from getall:',  result)
      //this.setState(() => ({startData: startData}))
      this.props.allDecks({startData: startData})
    })
  }

  render() {
    const { startData } = this.props
    console.log('DeckList render, this.props.startData', this.props.startData)

    return (
      <View>
      {startData !== undefined && Object.keys(startData).map((title) => {
        return (
          <View style={styles.container} key={title}>
            <DeckEntry title={title} count='3'  />
          </View>
        )})}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 40,
    backgroundColor: white
  },
})

function mapStateToProps (state) {
  return state
}


export default connect(
  mapStateToProps,
  { allDecks }
)(DeckList)
