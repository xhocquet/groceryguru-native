import { React } from 'react';
import { AppRegistry, Text, View, Button } from 'react-native';
import { TabNavigator } from 'react-navigation';

import AppReducer from './src/reducers/App'

import HomeScreen from './src/screens/HomeScreen';
import StatsScreen from './src/screens/StatsScreen';
import ReceiptsScreen from './src/screens/ReceiptsScreen';

import { GroceryGuruBlue, GroceryGuruPrimary, GroceryGuruWhite } from './src/styles/Colors';

export const GroceryGuruNavigator = TabNavigator({
  Home: { screen: HomeScreen },
  Stats: { screen: StatsScreen },
  Receipts: { screen: ReceiptsScreen }
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
      color: GroceryGuruWhite
    },
    style: {
      backgroundColor: GroceryGuruBlue,
    },
    indicatorStyle: {
      backgroundColor: GroceryGuruPrimary
    }
  }
});