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
    paddingTop: 0,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 2,
    borderBottomColor: green,
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
