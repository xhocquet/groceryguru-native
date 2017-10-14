import React, { Component } from 'react';

import {
  Platform,
  AsyncStorage,
  Text,
  View,
  FlatList,
  StyleSheet
} from 'react-native';

import { ApiEndpoints } from '../../App'

export default class ReceiptList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      timeStamp: 1508021630331
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
      // Error retrieving data
    }
  }

  async fetchReceiptsFromAPI() {
    console.log('fetching from endpoint');
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

  dateText(timeStamp) {
    let date = new Date(timeStamp);
    return date.toDateString();
  }

  render() {
    return (
      <View>
        <Text style={styles.dateText}>Last Update: {this.dateText(this.state.timeStamp)} </Text>
        <FlatList
          data={this.state.data}
          renderItem={this.renderReceipt}
          style={styles.receiptList}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dateText: {
    height: 48,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#bbb'
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