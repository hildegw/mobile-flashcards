import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
//import { Ionicons } from '@expo/vector-icons'
//import TextButton from './TextButton'
import { getAllDecks } from '../../utils/cardApi'
import { setStartData } from '../../utils/_cardData'
import { connect } from 'react-redux'
//import { deckAction } from './deckAction'
import { yellowLight, white } from '../../utils/colors'
//import { NavigationActions } from 'react-navigation'

class Deck extends Component {
  state = {
    startData: null,
  }

  componentDidMount() {
    const start = setStartData()
    getAllDecks().then((result) => {
      const { startData } = result
      console.log('Deck render, result from getall:',  result)
      this.setState(() => ({startData: startData}))
    })
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.state.startData)}</Text>
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
  mapStateToProps
)(Deck)
