import React from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { green, greenLight, orange } from '../../utils/colors'

export default function Indicator ({ numberOfQuestions, index, onPress }) {

  let helpArray = Array.from(Array(numberOfQuestions).keys())
  const deviceWidth = Dimensions.get('window').width

  return (

    <View style={styles.container} >
      {helpArray.map((item) =>
        <View
          style={[styles.miniButton, (item === index) && ({backgroundColor: green})]}
          key={item} >
        </View>)}

        <TouchableOpacity
          style={[styles.miniButton, {backgroundColor: orange}]}
          onPress={onPress} >
        </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'scroll',
    flexWrap: 'wrap',
    marginLeft: 55,
    marginRight: 55,
  },
  miniButton: {
    margin: 5,
    width: 12,
    height: 12,
    backgroundColor: greenLight,
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'center',
  },
})
