import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { green, white, grey, yellowLight } from '../../utils/colors'

export default function Indicator ({ numberOfQuestions, index }) {
  return (
    <View style={styles.textButton}>
      <Text style={styles.textButtonText} >
        {index+1} / {numberOfQuestions}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textButton: {
    backgroundColor: yellowLight,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    borderRadius: 100,
    borderWidth: 0,
    borderColor: green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonText: {
    color: grey,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
},
})
