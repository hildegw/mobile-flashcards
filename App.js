import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Deck from './components/deck/Deck'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import deckReducer from './components/deck/deckReducer'


export default class App extends React.Component {

  render() {
    return (
      <Provider store={createStore(deckReducer)}>
        <View style={{flex: 1}}>
          <Deck />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
