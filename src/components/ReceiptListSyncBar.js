import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ReceiptListSyncBar extends React.Component {

  dateText(timeStamp) {
    if (timeStamp == null) return '-';
    let date = new Date(timeStamp);
    return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }

  render() {
    return (
      <View style={styles.syncBar}>
        <Icon onClick={this.props.fetchReceipts} name='refresh' style={styles.refreshIcon} />
        <Text style={styles.dateText}>Last Update: {this.dateText(this.props.date)} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  syncBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#bbb',
    height: 48,
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
    lineHeight: 36
  }
});