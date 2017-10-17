import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { grey, greyLight, yellowLight } from '../../utils/colors'

export default function DeckEntry ({ title, count }) {
  return (
    <View style={styles.item}>

      <Text style={{fontSize: 20}}>
        {title}
      </Text>
      {count === 1
        ?   <Text style={{fontSize: 16, color: grey, paddingTop: 10,}}>
              {count} card
            </Text>
        :   <Text style={{fontSize: 16, color: grey, paddingTop: 10,}}>
              {count} cards
            </Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: yellowLight,
    borderRadius: 0,
    padding: 20,
    paddingLeft: 60,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: greyLight,
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
})
