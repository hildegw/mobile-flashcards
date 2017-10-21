import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import { grey, greyLight, yellowLight } from '../../utils/colors'

class Card extends Component {

  render() {
    //const { item } = this.props
    const deviceWidth = Dimensions.get('window').width
    console.log('Card render item:' , this.props.question)

    return (
      <View style={[styles.listItem, {width: deviceWidth-40}]}>
        <Text style={styles.text} >
            {this.props.question}
        </Text>
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
  },
  text: {
    fontSize:20,
    color: grey,
    margin: 40,
  },
})


export default Card
