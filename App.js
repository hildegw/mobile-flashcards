import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import DeckList from './components/deckList/DeckList'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
//import reducer from './reducers'
import deckListReducer from './components/deckList/deckListReducer'
import selectedCardReducer from './components/deck/selectedCardReducer'

import Deck from './components/deck/Deck'
import CardList from './components/deck/CardList'
import { green, white } from './utils/colors'
import { Constants } from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'

const reducer = combineReducers({
  deckListReducer,
  selectedCardReducer,
})

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = StackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green,
      }
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green,
      }
    }
  },
  CardList: {
    screen: CardList,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green,
      }
    }
  }
})

export default class App extends React.Component {

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={green} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
