import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { gray } from '../../utils/colors'

export default function DeckEntry ({ title, count }) {
  return (
    <View>

      <Text style={{fontSize: 20}}>
        {title}
      </Text>
      <Text style={{fontSize: 16, color: gray}}>
        {count} cards
      </Text>

    </View>
  )
}

const styles = StyleSheet.create({
  metric: {
    flexDirection: 'row',
    marginTop: 12
  },
})
