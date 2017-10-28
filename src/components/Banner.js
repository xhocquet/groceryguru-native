import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { GroceryGuruBlue, GroceryGuruWhite } from '../styles/Colors';

export default class Banner extends React.Component {
  onIconClicked() {

  }

  render() {
    return (
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          Grocery Guru
        </Text>
        <Icon onPress={this.onIconClicked.bind(this)} name='account-box' style={styles.userIcon} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: GroceryGuruBlue,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 3,
  },
  bannerText: {
    fontSize: 42,
    color: GroceryGuruWhite,
    fontWeight: 'bold',
  },
  userIcon: {
    fontSize: 48,
    color: GroceryGuruWhite,
    lineHeight: 52
  }
});