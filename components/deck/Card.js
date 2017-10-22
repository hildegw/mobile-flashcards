import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Animated } from 'react-native'
import { grey, greyLight, yellowLight } from '../../utils/colors'

class Card extends Component {

  state = {
    animatedValue: new Animated.Value(0),
    flip: false,
  }

  onPress = () => {
    if (this.state.flip) {
      Animated.timing(this.state.animatedValue, { totalValue: 180, duration: 800 }).start()
      this.setState({ flip: false })
    } else {
      Animated.timing(this.state.animatedValue, { totalValue: 0, duration: 800 }).start()
      this.setState({ flip: true })
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
    const frontAnimatedStyle = { transform: [{ rotateX: frontInterpolate}] }
    const backAnimatedStyle = { transform: [{ rotateX: backInterpolate}] }
    const deviceWidth = Dimensions.get('window').width
    console.log('Card render :' , this.state, frontInterpolate)

    return (
      <View>
        <Animated.View
          style={[styles.listItem, frontAnimatedStyle, {width: deviceWidth-40}]}
          onPress={this.onPress} >
          <Text style={styles.text} >
              {this.props.question}
          </Text>
        </Animated.View>
        <Animated.View
          style={[backAnimatedStyle, styles.listItem, styles.listItemBack, {width: deviceWidth-40}]}
          onPress={this.onPress} >
          <Text style={styles.text} >
              {this.props.answer}
          </Text>
        </Animated.View>
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.text} >
              show answer
          </Text>
        </TouchableOpacity>
      </View>
  )}
}

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: yellowLight,
    borderRadius: 20,
    margin: 20,
    backfaceVisibility: 'hidden'
  },
  listItemBack: {
    backgroundColor: yellowLight,
    position: 'absolute',
    top: 0,
  },
  text: {
    fontSize:20,
    color: grey,
    margin: 40,
  },
})


export default Card
