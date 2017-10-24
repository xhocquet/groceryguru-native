import React, { Component } from 'react';

import {
  Platform,
  AsyncStorage,
  Text,
  View,
  FlatList,
  StyleSheet
} from 'react-native';

import { GroceryGuruRed, GroceryGuruGreen, GroceryGuruPrimary, GroceryGuruYellow, GroceryGuruFadedYellow } from '../styles/Colors';
import { ApiEndpoints } from '../../App';
import ReceiptListSyncBar from './ReceiptListSyncBar';

export default class ReceiptList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      timeStamp: null
    };
  }

  componentDidMount() {
    this.loadReceiptData();
  }

  async loadReceiptData() {
    try {
      const value = await AsyncStorage.getItem('@GroceryGuru:lastReceiptListState');
      if (value !== null){
        console.log('data found!')
        // console.log(value)
        this.setState(JSON.parse(value));
      } else {
        console.log('data not found!')
        this.fetchReceiptsFromAPI();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async fetchReceiptsFromAPI() {
    fetch(ApiEndpoints.receiptList, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-User-Email': 'xhocquet@gmail.com',
        'X-User-Token': 'MVxPS4xcUdZkNT88aFxX'
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        data: res,
        timeStamp: Math.floor(Date.now())
      });
      this.saveCurrentState();
    })
    .catch(function(response) {
      console.log(response);
    })
  }

  async saveCurrentState() {
    try {
      console.log('saving data!');
      AsyncStorage.setItem('@GroceryGuru:lastReceiptListState', JSON.stringify(this.state));
    } catch (error) {
      console.log(error);
    }
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
    return (
      <View style={styles.receiptListContainer}>
        <ReceiptListSyncBar date={this.state.timeStamp} fetchReceipts={this.fetchReceiptsFromAPI.bind(this)} />
        {
          this.state.data.length === 0 &&
          this.emptyStatsNotification()
        }
        <FlatList
          style={styles.receiptList}
          data={this.state.data}
          renderItem={this.renderReceipt}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  receiptListContainer: {
    flex: 1
  },
  emptyReceiptsContainer: {
    borderColor: GroceryGuruYellow,
    borderWidth: 1,
    backgroundColor: GroceryGuruFadedYellow,
    padding: 20,
    margin: 12
  },
  emptyReceiptsContainerText: {
    textAlign: 'center'
  },
  receiptListItem: {
    height: 36,
    padding: 8,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: GroceryGuruPrimary
  },
  completed: {
    backgroundColor: GroceryGuruGreen
  },
  incomplete: {
    backgroundColor: GroceryGuruRed
  },
  receiptListItemName: {
    flex: 0.8
  },
  receiptListItemDate: {
    flex: 0.2
  },
  receiptListItemDateText: {
    textAlign: 'right'
  }
});