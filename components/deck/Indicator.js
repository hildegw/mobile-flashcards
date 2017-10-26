import React from 'react'
import { Text, View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import { green, greenLight, orangeLight, grey, orange } from '../../utils/colors'

export default function Indicator ({ numberOfQuestions, index, onPress }) {

  let helpArray = Array.from(Array(numberOfQuestions).keys())

  //JSX:  {index+1} / {numberOfQuestions}
  const deviceWidth = Dimensions.get('window').width
  console.log('Indicator, width', deviceWidth)
  //device deviceWidth by 22 for max number of miniButtons

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
