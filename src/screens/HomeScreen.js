import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Banner from '../components/Banner'

let onPressUpload = function() {
  // Initiate camera upload
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home'
  }

  render() {
    this.props.navigation.navigate('DrawerOpen'); // open drawer

    return (
      <View style={styles.screen}>
        <Banner />
        <View
          onPress={onPressUpload}
          style={styles.uploadButton} >
          <Text style={styles.uploadButtonText}>
            Upload receipt
          </Text>
        </View>
        <View style={styles.settingsButton} >
          <Text style={styles.settingsButtonText} >
            Settings
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
  uploadButton: {
    backgroundColor: '#00d1b2',
    padding: 24,
    marginTop: 96,
    marginLeft: 24,
    marginRight: 24,
    height: 200,
    justifyContent: 'center'
  },
  uploadButtonText: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white'
  },
  settingsButton: {
    marginTop: 48,
    justifyContent: 'center',
    height: 72,
    marginRight: 24,
    marginLeft: 24,
    backgroundColor: '#bdbdbd'
  },
  settingsButtonText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fefefe'
  }
});