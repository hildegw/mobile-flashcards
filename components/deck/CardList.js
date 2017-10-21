import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { grey, yellowDark, yellowLight, white, green, greenLight, orange } from '../../utils/colors'
import { dataSelectDeck } from '../../utils/_cardData'
import TextButton from './TextButton'
import Card from './Card'
import { selectCard } from './selectCardAction'

//TODO add score from previous try

class CardList extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: title + ' questions' }
  }

  componentDidMount() {
    this.props.selectCard({index: 0})
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this)
  }

  onViewableItemsChanged (items) {
    let viewableCardIndex = 0
    if (items !== undefined) viewableCardIndex = items.viewableItems.shift().key
    this.props.selectCard({index: viewableCardIndex})
  }

  onPressStartQuiz () {
    console.log('button start')
  }

  render() {
    console.log('Cardlist render, props: ', this.props.selectedCard)
    const { title } = this.props.navigation.state.params
    const { deckList, selectedCard } = this.props
    const selectedDeck = dataSelectDeck(deckList.startData, title)

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

        <View style={styles.buttonsInRow} >
          <TextButton
            onPress={() => this.onPressCorrect}
            children={' Correct '} >
          </TextButton>

          <TextButton
            onPress={this.onPressIncorrect}
            children={'Incorrect'}
            style={[{borderColor: orange}]} >
          </TextButton>
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
  { selectCard }
)(CardList)
