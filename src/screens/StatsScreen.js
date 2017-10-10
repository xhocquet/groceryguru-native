import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class StatsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Stats'
  };

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Grocery Guru
          </Text>
        </View>
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
  banner: {
    backgroundColor: '#3273dc',
    padding: 24,
  },
  bannerText: {
    fontSize: 50,
    color: '#F5FCFF',
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: '#00d1b2',
    padding: 24,
    margin: 48,
    height: 200
  }
});