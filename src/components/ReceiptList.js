import React, { Component } from 'react';
import { Platform, AsyncStorage, Text, View, FlatList, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';

import * as API from '../api/Endpoints';
import * as actions from '../actions';
import ReceiptListSyncBar from './ReceiptListSyncBar';
import styles from '../styles/ReceiptList';

export class ReceiptList extends React.Component {
  constructor(props) {
    super(props);
  }

  async fetchReceiptsData() {
    if (this.props.currentUser === undefined) {
      Alert.alert(
        'Please log in',
        'We cannot sync your data without logging in.',
        [{text: 'OK', onPress: () => true }],
        { cancelable: false }
      )
      return;
    }

    fetch(API.receiptList, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-User-Email': this.props.currentUser.email,
        'X-User-Token': this.props.currentUser.auth_token
      }
    })
    .then(res => res.json())
    .then(res => {
      debugger
      this.props.receiptsDataLoaded({
        data: res,
        timeStamp: Math.floor(Date.now())
      });
    })
    .catch( response => {
      Alert.alert(
        response.message,
        '',
        [{text: 'OK', onPress: () => true }],
        { cancelable: false }
      )
    })
  }

  renderReceipt = ({item}) => (
    <View style={[styles.receiptListItem, (item.completed ? styles.completed : styles.incomplete)]}>
      <View style={styles.receiptListItemName}>
        <Text>{item.store || "Unknown"}</Text>
      </View>
      <View style={styles.receiptListItemDate}>
        <Text style={styles.receiptListItemDateText}>{item.date || "Unknown"}</Text>
      </View>
    </View>
  );

  emptyStatsNotification() {
    return(
      <View style={styles.emptyReceiptsContainer}>
        <Text style={styles.emptyReceiptsContainerText}>
          You have no receipts. Please add a receipt and refresh.
        </Text>
      </View>
    )
  }

  render() {
    debugger
    if (!this.props.receiptsData) {
      return (
        <View style={styles.receiptListContainer}>
           <ReceiptListSyncBar fetchReceipts={this.fetchReceiptsData.bind(this)} />
           { this.emptyStatsNotification() }
        </View>
      );
    } else {
      return (
        <View style={styles.receiptListContainer}>
           <ReceiptListSyncBar fetchReceipts={this.fetchReceiptsData.bind(this)} date={this.props.receiptsData.timeStamp} />
           <FlatList
             style={styles.receiptList}
             data={this.props.receiptsData.data}
             renderItem={this.renderReceipt}
           />
        </View>
      );
    }
  }
}

export default connect(
  state => ({
    currentUser: state.currentUser,
    receiptsData: state.receiptsData
  }),
  dispatch => ({
    receiptsDataLoaded: receiptsData => dispatch(actions.receiptsDataLoaded(receiptsData))
  })
)(ReceiptList)

