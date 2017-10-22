import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { grey, yellowDark, yellowLight, white, green, greenLight, orange } from '../../utils/colors'
import { dataSelectDeck } from '../../utils/_cardData'
import SelectButton from './SelectButton'
import Indicator from './Indicator'
import Card from './Card'
import { selectCard } from './selectCardAction'
import { scoreCounter } from './scoreAction'

//TODO add score from previous try

class CardList extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: title + ' questions' }
  }

  componentDidMount() {
    this.props.selectCard({index: 0})
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this)
    this.onPressCorrect = this.onPressCorrect.bind(this)
    this.onPressIncorrect = this.onPressIncorrect.bind(this)
  }

  onViewableItemsChanged (items) {
    let viewableCardIndex = 0
    if (items !== undefined && items.viewableItems.length > 0) viewableCardIndex = items.viewableItems.shift().key
    this.props.selectCard({index: viewableCardIndex})
  }

  onPressCorrect () {
    this.props.scoreCounter(1)
    //TODO how to count correctly - toggle button?
  }

  onPressIncorrect () {
    console.log('button incorrect')
    //TODO call just once and keep pressed
  }

  render() {
    const { title } = this.props.navigation.state.params
    const { deckList, selectedCard, score } = this.props
    const selectedDeck = dataSelectDeck(deckList.startData, title)
    const numberOfQuestions = selectedDeck.questions.length
    console.log('Cardlist render, props: ', score)

    return (
      <View style={styles.container} >
        <FlatList
          data = {selectedDeck.questions}
          renderItem = {(({item}) =>
            <Card
              question={item.question}
              answer={item.answer}
            />
          )}
          keyExtractor={(item, index) => index}
          showsHorizontalScrollIndicator={true}
          horizontal={true}
          pagingEnabled={true}
          onViewableItemsChanged={this.onViewableItemsChanged}
        />

        <Indicator
          key={selectedCard.index}
          index={selectedCard.index}
          numberOfQuestions={numberOfQuestions} >
        </Indicator>

        <View style={styles.buttonsInRow} >
          <SelectButton
            onPress={this.onPressCorrect}
            children={' Correct '} >
          </SelectButton>

          <SelectButton
            onPress={this.onPressIncorrect}
            children={'Incorrect'}
            style={[{borderColor: orange}]} >
          </SelectButton>
        </View>
      </View>
      )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: greenLight,
  },
  buttonsInRow:{
    marginBottom: 40,
    flexDirection: 'row',
  }
})

function mapStateToProps (state) {
  //console.log('mapStateToProps in CarsList, state:', state)
  return state
}

export default connect(
  mapStateToProps,
  { selectCard, scoreCounter }
)(CardList)
