import { React } from 'react';
import { AppRegistry, Text, View, Button } from 'react-native';
import { TabNavigator } from 'react-navigation';

import AppReducer from './src/reducers/App'

import HomeScreen from './src/screens/HomeScreen';
import StatsScreen from './src/screens/StatsScreen';
import ReceiptsScreen from './src/screens/ReceiptsScreen';

import { GroceryGuruBlue, GroceryGuruPrimary } from './src/styles/Colors';

// Needs to be obfuscated
export const ApiEndpoints = {
  receiptList: "http://192.168.1.141:3000/receipts.json",
  statsIndex: "http://192.168.1.141:3000/stats.json",
  userRegistration: "http://192.168.1.141:3000/api/registration",
  userSession: "http://192.168.1.141:3000/api/session"
}

export const GroceryGuruNavigator = TabNavigator({
  Home: { screen: HomeScreen },
  Stats: { screen: StatsScreen },
  Receipts: { screen: ReceiptsScreen }
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: GroceryGuruBlue,
    },
    indicatorStyle: {
      backgroundColor: GroceryGuruPrimary
    }
  }
});