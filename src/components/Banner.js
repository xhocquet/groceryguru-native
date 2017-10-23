import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Banner extends React.Component {
  render() {
    return (
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          Grocery Guru
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#18587A',
    padding: 24,
  },
  bannerText: {
    fontSize: 50,
    color: '#ecf0f1',
    fontWeight: 'bold',
  }
});