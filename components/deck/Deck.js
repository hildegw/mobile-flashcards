import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { yellowLight, white } from '../../utils/colors'
//import { NavigationActions } from 'react-navigation'
import { dataSelectDeck } from '../../utils/_cardData'

class Deck extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: title }
  }

  render() {
    const { startData } = this.props
    const { title } = this.props.navigation.state.params
    const selectedDeck = dataSelectDeck(startData, title)
    const count = selectedDeck['questions'].length

    //console.log('Deck render, title from nav',  title)

    return (
      <View style={styles.container}>
        <Text>{selectedDeck.title}</Text>
        <Text>{count}</Text>
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
