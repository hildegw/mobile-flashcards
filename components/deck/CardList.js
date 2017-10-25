import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { grey, greenBack, yellowDark, yellowLight, green, orangeLight, orange } from '../../utils/colors'
import { dataSelectDeck } from '../../utils/_cardData'
import SelectButton from './SelectButton'
import Indicator from './Indicator'
import Score from './Score'
import Card from './Card'
import { selectCard } from './selectCardAction'
import { scoreCounter } from './scoreAction'

//TODO add score from previous try

class CardList extends Component {

  state = {
    correctAnswers: [],
    selectedDeck: {},
    numberOfQuestions: 0,
    scoreAdded: 0,
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: title + ' questions' }
  }

  componentDidMount() {
    //set selectedCard prop via action
    this.props.selectCard({index: 0})
    //determine the number of cards in the deck and set as state
    const { title } = this.props.navigation.state.params
    const { deckList } = this.props
    const selectedDeck = dataSelectDeck(deckList.startData, title)
    const numberOfQuestions = selectedDeck.questions.length
    this.setState({ selectedDeck: selectedDeck, numberOfQuestions: numberOfQuestions})
    //set correctAnswers to false for all cards
    const correctAnswers = []
    for (i=0; i<numberOfQuestions; i++) {correctAnswers.push(false)}
    this.setState({ correctAnswers: correctAnswers})
    //bind props to functions
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this)
    this.onPress = this.onPress.bind(this)
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this)
    //reset score counter in store
    this.props.scoreCounter(0)
  }

  onViewableItemsChanged (items) {
    let viewableCardIndex = -1
    if (items !== undefined && items.viewableItems.length > 0) {
      viewableCardIndex = items.viewableItems.shift().key
    }
    this.props.selectCard({index: viewableCardIndex})
  }

  onPress (type) {
    //keep track of which questions were answered correctly, or not
    const { index } = this.props.selectedCard
    const { correctAnswers } = this.state
    let newAnswers = []
    type === 'correct'
      ? newAnswers = correctAnswers.map((item, idx) => index === idx ? true : item)
      : newAnswers = correctAnswers.map((item, idx) => index === idx ? false : item)
    this.setState({ correctAnswers: newAnswers })
    //set score in store state
    if (newAnswers.length > 0) {
      const score = newAnswers.filter(answer => answer).length
      this.props.scoreCounter(score)
    }
  }

  renderScore = () => {
    return (
      <Score numberOfQuestions={this.state.numberOfQuestions}>
      </Score>
    )
  }

  render() {
    const { deckList, selectedCard, score } = this.props
    const { numberOfQuestions, selectedDeck } = this.state
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
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          pagingEnabled={true}
          onViewableItemsChanged={this.onViewableItemsChanged}
          ListFooterComponent={this.renderScore}
        />

        {(selectedCard.index > -1) &&
          <View>
            <Indicator
              key={selectedCard.index}
              index={selectedCard.index}
              numberOfQuestions={numberOfQuestions} >
            </Indicator>

            <View style={styles.buttonsInRow} >
              <SelectButton
                onPress={() => this.onPress('correct')}
                children={' Correct '}
                style={[cardAnsweredCorrectly && ({backgroundColor: greenBack})]} >
              </SelectButton>

              <SelectButton
                onPress={() => this.onPress('incorrect')}
                children={'Incorrect'}
                style={[{borderColor: orange}, !cardAnsweredCorrectly && ({backgroundColor: orangeLight})]} >
              </SelectButton>
            </View>
          </View>
        }

      </View>
      )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: yellowLight,
  },
  buttonsInRow:{
    marginBottom: 60,
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
