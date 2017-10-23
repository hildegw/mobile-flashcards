import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { grey, greenBack, yellowDark, yellowLight, green, orangeLight, greenLight, orange } from '../../utils/colors'
import { dataSelectDeck } from '../../utils/_cardData'
import SelectButton from './SelectButton'
import Indicator from './Indicator'
import Card from './Card'
import { selectCard } from './selectCardAction'
import { scoreCounter } from './scoreAction'

//TODO add score from previous try

class CardList extends Component {

  state = {
    correctAnswers: [],
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: title + ' questions' }
  }

  componentDidMount() {
    //set selectedCard prop via action
    this.props.selectCard({index: 0})
    //determine the number of cards in the deck
    const { title } = this.props.navigation.state.params
    const { deckList } = this.props
    const selectedDeck = dataSelectDeck(deckList.startData, title)
    const numberOfQuestions = selectedDeck.questions.length
    //set correctAnswers to false for all cards
    const correctAnswers = []
    for (i=0; i<numberOfQuestions; i++) {correctAnswers.push(false)}
    this.setState({ correctAnswers: correctAnswers})
    //bind props to functions
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this)
    this.onPress = this.onPress.bind(this)
  }

  onViewableItemsChanged (items) {
    let viewableCardIndex = 0
    if (items !== undefined && items.viewableItems.length > 0) viewableCardIndex = items.viewableItems.shift().key
    this.props.selectCard({index: viewableCardIndex})
  }

  onPress (type) {
    const { index } = this.props.selectedCard
    const { correctAnswers } = this.state
    let newAnswers = []
    type === 'correct'
      ? newAnswers = correctAnswers.map((item, idx) => index === idx ? true : item)
      : newAnswers = correctAnswers.map((item, idx) => index === idx ? false : item)
    this.setState({ correctAnswers: newAnswers })
    this.props.scoreCounter(1)
    console.log('onPressCorrect in CardList: state:', newAnswers)
    //TODO set counting logic > maybe show component with current status
  }

  renderFooter = () => {
    console.log('end reached')
    return (<Text>Ende</Text>)
  }

  render() {
    const { title } = this.props.navigation.state.params
    const { deckList, selectedCard, score } = this.props
    const selectedDeck = dataSelectDeck(deckList.startData, title)
    const numberOfQuestions = selectedDeck.questions.length
    const { correctAnswers } = this.state
    const cardAnsweredCorrectly = correctAnswers[selectedCard.index]

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
          ListFooterComponent={this.renderFooter}
        />

        <Indicator
          key={selectedCard.index}
          index={selectedCard.index}
          numberOfQuestions={numberOfQuestions} >
        </Indicator>

        <View style={styles.buttonsInRow} >
          <SelectButton
            onPress={() => this.onPress('correct')}
            children={' Correct '}
            style={[cardAnsweredCorrectly && ({borderColor: green}, {backgroundColor: yellowDark})]} >
          </SelectButton>

          <SelectButton
            onPress={() => this.onPress('incorrect')}
            children={'Incorrect'}
            style={[{borderColor: orangeLight}, !cardAnsweredCorrectly && ({borderColor: orange}, {backgroundColor: yellowDark})]} >
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
    backgroundColor: greenBack,
  },
  buttonsInRow:{
    marginBottom: 40,
    flexDirection: 'row',
  }
})

function mapStateToProps (state) {
  return state
}

export default connect(
  mapStateToProps,
  { selectCard, scoreCounter }
)(CardList)
