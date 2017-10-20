import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { grey, yellowDark, yellowLight, white, green, greenLight, orange } from '../../utils/colors'
import { dataSelectDeck } from '../../utils/_cardData'
import TextButton from './TextButton'
import Card from './Card'

//TODO add score from previous try

class CardList extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: title + ' questions' }
  }

  onPressAddCard () {
    console.log('1srt button add')
  }

  onPressStartQuiz () {
    console.log('button start')
  }

  render() {
    const { title } = this.props.navigation.state.params
    const { startData } = this.props
    const selectedDeck = dataSelectDeck(startData, title)
    console.log('Cardlist render, selectedDeck: ', this.props)

    return (
      <View style={styles.container} >
        <FlatList
          data = {selectedDeck.questions}
          renderItem = {(({item}) =>
            <Card question={item.question} />
          )}
          keyExtractor={(item, index) => index}
          showsHorizontalScrollIndicator={true}
          horizontal={true}
          pagingEnabled={true}
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
  return state
}

export default connect(
  mapStateToProps
)(CardList)
