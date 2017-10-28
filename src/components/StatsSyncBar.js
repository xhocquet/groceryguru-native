import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { GroceryGuruPrimary } from '../styles/Colors';

export default class StatsSyncBar extends React.Component {
  dateText(timeStamp) {
    if (timeStamp == null) return '-';
    let date = new Date(timeStamp);
    return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }

  onIconClicked() {
    this.props.fetchStatsData();
  }

  render() {
    return (
      <View style={styles.syncBar}>
        <Icon onPress={this.onIconClicked.bind(this)} name='refresh' style={styles.refreshIcon} />
        <Text style={styles.dateText}>Last Update: {this.dateText(this.props.date)} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  syncBar: {
    flexDirection: 'row',
    height: 48,
    elevation: 2,
    backgroundColor: '#ededed'
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    textAlign: 'right',
  },
  refreshIcon: {
    paddingLeft: 8,
    flex: 0.1,
    fontSize: 24,
    lineHeight: 36,
    color: GroceryGuruPrimary
  }
});