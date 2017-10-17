import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { yellowLight, white } from '../../utils/colors'
//import { NavigationActions } from 'react-navigation'

class Deck extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: title }
  }



  render() {

    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.props.startData)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 40,
    backgroundColor: white
  },
})

function mapStateToProps (state) {
  return state
}

export default connect(
  mapStateToProps
)(Deck)
