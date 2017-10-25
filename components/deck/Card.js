import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Animated } from 'react-native'
import { grey, green, greyLight, yellowLight } from '../../utils/colors'

//TODO revisit animation

class Card extends Component {

  state = {
    animatedValue: new Animated.Value(0),
    flip: false,
  }

  onPress = () => {
    if (this.state.flip) {
      Animated.timing(this.state.animatedValue, { totalValue: 180, duration: 800 })
      .start((finished) => this.setState({ flip: false, animatedValue: new Animated.Value(0) }))
    } else {
      Animated.timing(this.state.animatedValue, { totalValue: 0, duration: 800 })
        .start((finished) => this.setState({ flip: true, animatedValue: new Animated.Value(180) }))
    }
  }


  render() {
    const backInterpolate = this.state.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    })
    const backAnimatedStyle = { transform: [{ rotateY: backInterpolate}] }
    const deviceWidth = Dimensions.get('window').width
    const { score, index } = this.props

    return (
      <View style={[styles.container, {width: deviceWidth-40}]}>
        <View style={styles.listItem} >
          <Text style={styles.text} >
              {this.props.question}
          </Text>
        </View>

        <Animated.View
          style={[backAnimatedStyle, styles.listItem]}
          onPress={this.onPress} >
          <Text style={styles.text} >
              {this.props.answer}
          </Text>
        </Animated.View>

        <TouchableOpacity
          style={styles.listItem}
          onPress={this.onPress}>
          <Text style={styles.textSmall} >
              toggle answer
          </Text>
        </TouchableOpacity>
      </View>
  )}
}

const styles = StyleSheet.create({
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
  listItem: {
    backfaceVisibility: 'hidden',
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
