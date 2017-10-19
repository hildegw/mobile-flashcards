import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { grey, greyLight, yellowLight, white, green, orange } from '../../utils/colors'
import { dataSelectDeck } from '../../utils/_cardData'
import TextButton from './TextButton'

//TODO add score from previous try

class Deck extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: title + ' Deck'}
  }

  onPressAddCard () {
    console.log('presssssed add')
  }

  render() {
    const { startData } = this.props
    const { title } = this.props.navigation.state.params
    const selectedDeck = dataSelectDeck(startData, title)
    const count = selectedDeck['questions'].length
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <Text style={[styles.text, {fontSize: 32}, {fontWeight: 'bold'}]} >
          {selectedDeck.title}
        </Text>
        {count === 1
          ?   <Text style={styles.text}>
                {count} card
              </Text>
          :   <Text style={styles.text}>
                {count} cards
              </Text>
        }

        <View style={styles.buttonsInRow} >
          <TextButton
            onPress={this.onPressAddCard}
            children={'Add Card'}
          />

          <TextButton
            onPress={() => navigate(
              'CardList',
              { title: selectedDeck.title }
            )}
            children={'Start Quiz'}
            style={[{borderColor: orange}]}
          />
        </View>
      </View>

  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
  }
})

function mapStateToProps (state) {
  console.log('mapStateToProps in Deck', state)
  return state
}

export default connect(
  mapStateToProps
)(Deck)
