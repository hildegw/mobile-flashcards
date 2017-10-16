import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
//import TextButton from './TextButton'
import { getAllDecks } from '../utils/cardApi'
import { getStartData } from '../utils/_cardData'
import { connect } from 'react-redux'
import { deckAction } from './deckAction'
import { yellowLight, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

class Deck extends Component {
  state = {
    run: 0,
  }

  render() {
    const data = getAllDecks()
    console.log('Deck render' )
    return (
      <View style={styles.container}>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
})

function mapStateToProps (state) {
}

export default connect(
  mapStateToProps
)(Deck)
