import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';

import { GroceryGuruRed, GroceryGuruYellow, GroceryGuruGreen, GroceryGuruFadedYellow } from '../styles/Colors';
import { ApiEndpoints } from '../../App';
import Banner from '../components/Banner';

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
        // console.log(value)
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
      if (res.error) {
        console.log(res.error);
        return;
      }
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
    if (this.state.data.length === 0) {
      return (
        <View style={styles.statsScreen}>
          <Banner />
          <View style={styles.emptyStatsContainer}>
            <Text style={styles.emptyStatsContainerText}>
              You do not have stats to display.
              In order to create suggestions, you must have at least one item from two different stores.
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.statsScreen}>
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
}

const styles = StyleSheet.create({
  statsScreen: {
    flex: 1,
  },
  emptyStatsContainer: {
    borderColor: GroceryGuruYellow,
    borderWidth: 1,
    backgroundColor: GroceryGuruFadedYellow,
    padding: 20,
    margin: 12
  },
  emptyStatsContainerText: {
    textAlign: 'center'
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  statsBox: {
    height: '20%',
    marginLeft: 24,
    marginRight: 24,
    justifyContent: 'center'
  },
  'worst-transactions': {
    backgroundColor: GroceryGuruRed
  },
  'improvable-transactions': {
    backgroundColor: GroceryGuruYellow
  },
  'best-transactions': {
    backgroundColor: GroceryGuruGreen
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