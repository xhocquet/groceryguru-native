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
      <View style={styles.receiptsScreen}>
        <Banner />
        <ReceiptList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  receiptsScreen: {
    flex: 1,
  }
});