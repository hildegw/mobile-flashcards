import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Dimensions, PixelRatio } from 'react-native'
import { connect } from 'react-redux'
import { grey, yellowDark, yellowLight, white, green, orangeLight } from '../../utils/colors'
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
    const deviceWidth = Dimensions.get('window').width
    console.log('render Card, width:', deviceWidth)


    return (
      <View style={styles.container} >
        <FlatList
          data = {selectedDeck.questions}
          renderItem = {(({item}) =>
            <View style={[styles.listItem, {width: deviceWidth}]}>
              <Text style={styles.text} >
                  {item.question}
              </Text>
            </View>
            )}
          keyExtractor={((item, index) => item.question)}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={true}
          horizontal={true}
          decelerationRate={0}
          snapToInterval={50}
          snapToAlignment={'center'}
        />

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: yellowDark,
    paddingTop: 60,
  },
  listItem: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: yellowLight,
    borderRadius: 20,
    padding: 20,

  },
  text: {
    fontSize:20,
    color: grey,
    padding: 10,
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
)(Card)
