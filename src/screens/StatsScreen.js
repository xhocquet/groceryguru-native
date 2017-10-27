import React, { Component } from 'react';
import { AsyncStorage, Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';

import * as API from '../api/Endpoints';
import Banner from '../components/Banner';
import StatsSyncBar from '../components/StatsSyncBar';
import StyleSheet from '../styles/StatsScreen';

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

    fetch(API.statsIndex, {
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
        <View style={[StyleSheet.statsBox, styles[dataString]]}>
          <View style={StyleSheet.statsLabelWrapper}>
            <Text style={StyleSheet.statsLabel}>{this.state.data[dataString].length} {this.statsLabelString(dataString)}</Text>
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
        <View style={StyleSheet.statsScreen}>
          <Banner />
          <StatsSyncBar  fetchStatsData={this.fetchStatsData.bind(this)} date={this.state.timestamp} />
          <View style={StyleSheet.emptyStatsContainer}>
            <Text style={StyleSheet.emptyStatsContainerText}>
              You do not have stats to display.
              In order to create suggestions, you must have at least one item from two different stores.
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={StyleSheet.statsScreen}>
          <Banner />
          <StatsSyncBar fetchStatsData={this.fetchStatsData.bind(this)} date={this.state.timestamp} />
          <View
            style={StyleSheet.statsContainer} >
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
