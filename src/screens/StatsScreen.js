import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';

import { GroceryGuruRed, GroceryGuruYellow, GroceryGuruGreen, GroceryGuruFadedYellow } from '../styles/Colors';
import { ApiEndpoints } from '../../App';
import Banner from '../components/Banner';
import StatsSyncBar from '../components/StatsSyncBar';

export class StatsScreen extends React.Component {
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
    if (this.props.currentUser != undefined) {
      this.loadStatsData();
    }
  }

  async loadStatsData() {
    try {
      const value = await AsyncStorage.getItem('@GroceryGuru:lastDataScreenState');
      if (value !== null){
        this.setState(JSON.parse(value));
      } else {
        this.fetchStatsFromAPI();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchStatsData() {
    if (this.props.currentUser === undefined) {
      Alert.alert(
        'Please log in',
        'We cannot sync your data without logging in.',
        [{text: 'OK', onPress: () => true }],
        { cancelable: false }
      )
      return;
    }

    fetch(ApiEndpoints.statsIndex, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-User-Email': this.props.currentUser.email,
        'X-User-Token': this.props.currentUser.auth_token
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
      Alert.alert(
        response.message,
        '',
        [{text: 'OK', onPress: () => true }],
        { cancelable: false }
      )
    })
  }

  async saveCurrentState() {
    try {
      AsyncStorage.setItem('@GroceryGuru:lastDataScreenState', JSON.stringify(this.state));
    } catch (error) {
      console.error(error);
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
          <StatsSyncBar  fetchStatsData={this.fetchStatsData.bind(this)} date={this.state.timestamp} />
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
          <StatsSyncBar fetchStatsData={this.fetchStatsData.bind(this)} date={this.state.timestamp} />
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

export default connect(
  state => ({
    currentUser: state.currentUser,
    statsData: state.data
  }),
  dispatch => ({
    userLoggedIn: currentUser => dispatch(actions.userLoggedIn(currentUser)),
    userLoggedOut: () => dispatch(actions.userLoggedOut())
  })
)(StatsScreen)

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