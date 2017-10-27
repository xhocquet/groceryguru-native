import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';

import * as API from '../api/Endpoints';
import * as actions from '../actions';
import Banner from '../components/Banner';
import StatsSyncBar from '../components/StatsSyncBar';
import StyleSheet from '../styles/StatsScreen';

export class StatsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  static navigationOptions = {
    tabBarLabel: 'Stats'
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
      this.props.statsDataLoaded({
        data: res,
        timeStamp: Math.floor(Date.now())
      })
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
    statsDataLoaded: statsData => dispatch(actions.statsDataLoaded(statsData)),
  })
)(StatsScreen)
