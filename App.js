import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import DeckList from './components/deckList/DeckList'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import deckList from './components/deckList/deckListReducer'
import selectedCard from './components/deck/selectCardReducer'
import score from './components/deck/scoreReducer'
import AddDeckTitle from './components/deckList/AddDeckTitle'
import Deck from './components/deck/Deck'
import CardList from './components/deck/CardList'
import { green, white, orange, yellowLight } from './utils/colors'
import { Constants } from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'

const reducer = combineReducers({
  deckList,
  selectedCard,
  score,
})

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = StackNavigator({
  Home: { screen: DeckList, cardStyle: {backgroundColor: yellowLight} },
  Deck: { screen: Deck },
  AddDeckTitle: { screen: AddDeckTitle },
  CardList: {
    screen: CardList,
    mode: 'modal',
    cardStyle: {
        backgroundColor: 'transparent',
        opacity: 1,
      }
    }
  }, {
  navigationOptions: {
      headerTintColor: white,
      headerStyle: { backgroundColor: green },
    },
  },
)

export default class App extends React.Component {

  render() {
    console.log('render App, reducer:', reducer)
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
