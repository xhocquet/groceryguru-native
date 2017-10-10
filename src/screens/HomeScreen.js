import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

let onPressUpload = function() {
  // Initiate camera upload
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home'
  };

  render() {
    this.props.navigation.navigate('DrawerOpen'); // open drawer

    return (
      <View style={styles.screen}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Grocery Guru
          </Text>
        </View>
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