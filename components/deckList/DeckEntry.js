import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { grey, greyLight, yellowLight } from '../../utils/colors'

export default class DeckEntry extends Component {

  onPress = () => {
    const { title, onPressItem, navigate } = this.props
    onPressItem(title, navigate)
    //console.log('entry: ', this.props)
  }

  render () {
    const { title, count } = this.props
    return (
      <TouchableOpacity onPress={this.onPress} >
        <View style={styles.item}>
          <Text style={{fontSize: 20}}>
            {title}
          </Text>
          {count === 1
            ?   <Text style={{fontSize: 16, color: grey, paddingTop: 10,}}>
                  {count} card
                </Text>
            :   <Text style={{fontSize: 16, color: grey, paddingTop: 10,}}>
                  {count} cards
                </Text>
          }
        </View>
      </TouchableOpacity>
  )}
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: yellowLight,
    borderRadius: 0,
    marginBottom: 1,
    padding: 20,
    paddingLeft: 60,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: greyLight,
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
})
