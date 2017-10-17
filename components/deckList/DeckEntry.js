import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { gray, yellowLight } from '../../utils/colors'

export default function DeckEntry ({ title, count }) {
  return (
    <View style={styles.item}>

      <Text style={{fontSize: 20}}>
        {title}
      </Text>
      <Text style={{fontSize: 16, color: gray, paddingTop: 10,}}>
        {count} cards
      </Text>

    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: yellowLight,
    borderRadius: 5,
    padding: 60,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
})
