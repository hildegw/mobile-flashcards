import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { grey, greyLight, yellowLight, white, green, orangeLight } from '../../utils/colors'
import { dataSelectDeck } from '../../utils/_cardData'
import TextButton from './TextButton'

//TODO add score from previous try

class Card extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: title + ' quiz question' }
  }

  onPressAddCard () {
    console.log('1srt button add')
  }

  onPressStartQuiz () {
    console.log('button start')
  }

  render() {
    const { startData } = this.props
    const { title } = this.props.navigation.state.params
    const selectedDeck = dataSelectDeck(startData, title)
    console.log('render Card, selectedDeck:', selectedDeck['questions'][0])

    return (
      <View style={styles.container}>
        { selectedDeck !== undefined &&
        <FlatList
          data = {selectedDeck.questions}
          renderItem = {(({item}) =>
            <View style={styles.container}>
              <Text style={[styles.text, {fontSize: 24}, {fontWeight: 'bold'}]} >
                  {item.question}
              </Text>
            </View>
            )}
          keyExtractor={((item, index) => item.question)}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={false}
          horizontal
          pagingEnabled
        />}

      <View style={styles.buttonsInRow} >
        <TextButton
          onPress={this.onPressAddCard}
          children={' Correct '} >
        </TextButton>

        <TextButton
          onPress={this.onPressStartQuiz}
          children={'Incorrect'}
          style={[{borderColor: orangeLight}, {backgroundColor: orangeLight}]} >
        </TextButton>
      </View>
    </View>


  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
  return state
}

export default connect(
  mapStateToProps
)(Card)
