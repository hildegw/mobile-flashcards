import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { green, white, grey, yellowLight } from '../../utils/colors'

class Score extends Component {

  render () {
    const deviceWidth = Dimensions.get('window').width

    return (
      <View style={[styles.container, {width: deviceWidth-40}]}>
        <View style={styles.textButton}>
          <Text style={styles.textButtonText} >
            {this.props.score}
          </Text>
        </View>
      </View>
    )
  }
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

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: yellowLight,
    borderRadius: 20,
    margin: 20,
  },
  text: {
    fontSize:20,
    color: grey,
    margin: 40,
  },
})

function mapStateToProps (state) {
  return state.score
}

export default connect(
  mapStateToProps,
)(Score)
