import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { green, white, grey, yellowLight } from '../../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.textButton, style]} >
      <Text style={[styles.textButtonText, style]}>{children}</Text>
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
    borderWidth: 3,
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
