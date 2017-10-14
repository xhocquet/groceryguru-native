import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Banner from '../components/Banner'

export default class StatsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Stats'
  }

  render() {
    return (
      <View style={styles.screen}>
        <Banner />
        <View
          style={styles.uploadButton} >
          <Text>
            Stats
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
});