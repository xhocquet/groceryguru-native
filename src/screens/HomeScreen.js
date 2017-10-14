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
          <Text>
            Upload receipt
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
    margin: 24,
    height: 200
  }
});