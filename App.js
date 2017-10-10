import { React } from 'react';

import { AppRegistry, Text, View, Button } from 'react-native';

import { TabNavigator } from 'react-navigation';

import HomeScreen from './src/screens/HomeScreen';

import StatsScreen from './src/screens/StatsScreen';

import ReceiptsScreen from './src/screens/ReceiptsScreen';

export const GroceryGuruApp = TabNavigator({
  Home: { screen: HomeScreen },
  Stats: { screen: StatsScreen },
  Receipts: { screen: ReceiptsScreen }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: '#3273dc',
    },
    indicatorStyle: {
      backgroundColor: '#00d1b2'
    }
  }
});

