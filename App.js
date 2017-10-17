import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DeckList from './components/deckList/DeckList'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import deckListReducer from './components/deckList/deckListReducer'


export default class App extends React.Component {

  render() {
    return (
      <Provider store={createStore(deckListReducer)}>
        <View style={{flex: 1}}>
          <DeckList />
        </View>
      </Provider>
    )
  }
}
