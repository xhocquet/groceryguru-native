import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Banner from '../components/Banner'

import { GroceryGuruPrimary } from '../styles/Colors'

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
          <Icon name='settings' style={styles.settingsIcon} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  uploadButton: {
    backgroundColor: GroceryGuruPrimary,
    height: 200,
    justifyContent: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 96,
    padding: 24,
  },
  uploadButtonText: {
    color: '#ecf0f1',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  settingsButton: {
    backgroundColor: GroceryGuruPrimary,
    flexDirection: 'row',
    height: 72,
    alignItems: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 48,
  },
  settingsButtonText: {
    color: '#ecf0f1',
    fontSize: 24,
    flex: 1,
    textAlign: 'center',
  },
  settingsIcon: {
    flex: 0.1,
    color: '#ecf0f1',
    fontSize: 24,
  }
});