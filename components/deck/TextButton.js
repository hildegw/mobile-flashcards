import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { green, white, yellowDark, greenLight, orangeLight } from '../../utils/colors'

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
    backgroundColor: green,
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
    color: white,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
},
})
