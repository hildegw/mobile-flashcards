import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { green, white, grey, yellowLight } from '../../utils/colors'

export default function Indicator ({ numberOfQuestions, index }) {
  return (
    <TouchableOpacity >
      <Text style={styles.textButtonText}>{index+1} / {numberOfQuestions}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  textButton: {
    backgroundColor: yellowLight,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    marginTop: 40,
    borderRadius: 100,
    borderWidth: 5,
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
