import React, { Component } from 'react';

import {
  Platform,
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { ApiEndpoints } from '../../App'
import Banner from '../components/Banner'

export default class StatsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      timeStamp: null
    };
  }

  static navigationOptions = {
    tabBarLabel: 'Stats'
  }

  componentDidMount() {
    this.loadStatsData();
  }

  async loadStatsData() {
    try {
      const value = await AsyncStorage.getItem('@GroceryGuru:lastDataScreenState');
      if (value !== null){
        console.log('data found!')
        console.log(value)
        this.setState(JSON.parse(value));
      } else {
        console.log('data not found!')
        this.fetchStatsFromAPI();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async fetchStatsFromAPI() {
    console.log('fetching from endpoint');
    fetch(ApiEndpoints.statsIndex, {
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
      console.log(this.state)
      console.log('saving data!');
      AsyncStorage.setItem('@GroceryGuru:lastDataScreenState', JSON.stringify(this.state));
    } catch (error) {
      console.log(error);
    }
  }

  statsLabelString(dataString) {
    if (dataString === 'worst-transactions') {
      return 'items are in bad shape!'
    } else if (dataString === 'improvable-transactions') {
      return 'items need work'
    } else if (dataString === 'best-transactions') {
      return 'items are in great shape!';
    }
  }

  renderStatsBox(dataString) {
    if (Object.keys(this.state.data).length > 0  && this.state.data[dataString].length > 0) {
      return (
        <View style={[styles.statsBox, styles[dataString]]}>
          <View style={styles.statsLabelWrapper}>
            <Text style={styles.statsLabel}>{this.state.data[dataString].length} {this.statsLabelString(dataString)}</Text>
          </View>
        </View>
      );
    } else {
      return;
    }
  }

  render() {
    return (
      <View style={styles.screen}>
        <Banner />
        <View
          style={styles.statsContainer} >
          {this.renderStatsBox('worst-transactions')}
          {this.renderStatsBox('improvable-transactions')}
          {this.renderStatsBox('best-transactions')}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ecf0f1',
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  statsBox: {
    height: '25%',
    marginLeft: 24,
    marginRight: 24,
    justifyContent: 'center'
  },
  'worst-transactions': {
    backgroundColor: '#D96459'
  },
  'improvable-transactions': {
    backgroundColor: '#F2AE72'
  },
  'best-transactions': {
    backgroundColor: '#588C73'
  },
  statsLabelWrapper: {
    backgroundColor: '#ecf0f1',
    margin: 24,
    padding: 8
  },
  statsLabel: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
});