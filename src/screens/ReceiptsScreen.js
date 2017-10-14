import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Banner from '../components/Banner'
import ReceiptList from '../components/ReceiptList'

export default class ReceiptsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Receipts'
  }

  render() {
    return (
      <View style={styles.screen}>
        <Banner />
        <ReceiptList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
});