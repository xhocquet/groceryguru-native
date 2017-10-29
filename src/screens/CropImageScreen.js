import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import StyleSheet from '../styles/HomeScreen';

export default class LoginScreen extends React.Component {
  render() {
    let { receiptImageSource } = this.props;
    return (
      <View style={[StyleSheet.screen, StyleSheet.imageScreen]}>
        <Image
          style={StyleSheet.photoContainer}
          source={{uri: receiptImageSource}}
          resizeMode="contain"
        />
      </View>
    );
  }
}