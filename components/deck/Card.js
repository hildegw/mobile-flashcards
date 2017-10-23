import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Animated } from 'react-native'
import { grey, greyLight, yellowLight } from '../../utils/colors'

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
    const frontInterpolate = this.state.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    const backInterpolate = this.state.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    })
    const zInterpolate = this.state.animatedValue.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    })
    const frontAnimatedStyle = { transform: [{ rotateY: frontInterpolate}, {rotateZ: zInterpolate}] }
    const backAnimatedStyle = { transform: [{ rotateY: backInterpolate}] }
    const deviceWidth = Dimensions.get('window').width
    const { score, index } = this.props
    console.log('Card render :' , this.props)

    return (
      <Animated.View
        style={[styles.container, {width: deviceWidth-40}]}>
        <Animated.View
          style={[styles.listItem, frontAnimatedStyle, {width: deviceWidth-40}]}
          onPress={this.onPress} >
          <Text style={styles.text} >
              {this.props.question}
          </Text>
        </Animated.View>

        <Animated.View
          style={[backAnimatedStyle, styles.listItem, {width: deviceWidth-40}]}
          onPress={this.onPress} >
          <Text style={styles.text} >
              {this.props.answer}
          </Text>
        </Animated.View>

        <TouchableOpacity
          style={styles.listItem}
          onPress={this.onPress}>
          <Text style={styles.text} >
              show answer
          </Text>
        </TouchableOpacity>
      </Animated.View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: yellowLight,
    borderRadius: 20,
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
})

function mapStateToProps (state) {
  const { score, index } = state
  return { score, index }
}

export default connect(
  mapStateToProps,
)(Card)
