import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { green, white, grey, greenLight } from '../../utils/colors'

export default function Indicator ({ numberOfQuestions, index }) {

  let helpArray = Array.from(Array(numberOfQuestions).keys())
  //const helpArray2 = helpArray.map((item) => { key: item})
  //console.log('helpArray2', helpArray2)

  //JSX:  {index+1} / {numberOfQuestions}



  return (
    <View style={styles.container} >
      {helpArray.map((item) =>
        <View
          style={[styles.miniButton, (item === index) && ({backgroundColor: greenLight})]}
          key={item} >
        </View>)}

        <View
          style={[styles.miniButton, (index === -1) && ({backgroundColor: greenLight})]} >
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'scroll',

  },
  miniButton: {
    margin: 5,
    width: 12,
    height: 12,
    backgroundColor: green,
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'center',
  },
})
