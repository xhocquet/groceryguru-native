import React, { Component } from 'react';

import {
  Platform,
  AsyncStorage,
  Text,
  View,
  FlatList,
  StyleSheet
} from 'react-native';

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
        console.log(value)
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
        <Text>{item.date || "Unknown"}</Text>
      </View>
    </View>
  );


  render() {
    return (
      <View style={styles.receiptList}>
        <ReceiptListSyncBar date={this.state.timeStamp} fetchReceipts={this.fetchReceiptsFromAPI.bind(this)} />
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
  receiptList: {
    marginBottom: 100
  },
  receiptListItem: {
    height: 36,
    padding: 8,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  completed: {
    backgroundColor: '#23d160'
  },
  incomplete: {
    backgroundColor: '#ff3860'
  },
  receiptListItemName: {
    flex: 0.7
  },
  receiptListItemDate: {
    flex: 0.3
  },
});