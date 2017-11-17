import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import { grey, green, greyLight, yellowLight } from '../../utils/colors'

class Card extends Component {

  state = { showAnswer: false }

  onPress = () => {
    this.setState({ showAnswer: !this.state.showAnswer })
  }


  render() {

    const deviceWidth = Dimensions.get('window').width
    const { score, index } = this.props

    return (
      <ScrollView contentContainerStyle={styles.contentContainer} >
        <View style={[styles.container, {width: deviceWidth-40}]}>

          {this.state.showAnswer
            ? <Text style={styles.text} >
                {this.props.answer}
              </Text>
            : <Text style={styles.text} >
                {this.props.question}
              </Text>
          }

          <TouchableOpacity
            onPress={this.onPress}>
            <Text style={styles.textSmall} >
                flip
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
  )}
}

const styles = StyleSheet.create({
  contentContainer: {
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: yellowLight,
    borderBottomWidth: 2,
    borderBottomColor: green,
    borderTopWidth: 2,
    borderTopColor: green,
    margin: 20,
  },
  text: {
    fontSize:20,
    color: grey,
    margin: 40,
  },
  textSmall: {
    fontSize:12,
    color: grey,
    margin: 40,
    textDecorationLine: "underline",
  },
})

function mapStateToProps (state) {
  const { score, index } = state
  return { score, index }
}

export default connect(
  mapStateToProps,
)(Card)
