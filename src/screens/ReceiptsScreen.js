import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Banner from '../components/Banner';
import ReceiptList from '../components/ReceiptList';
import { GroceryGuruWhite } from '../styles/Colors';

export default class ReceiptsScreen extends React.Component {
  static navigationOptions = { tabBarLabel: 'Receipts' }

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
    backgroundColor: GroceryGuruWhite
  }
});