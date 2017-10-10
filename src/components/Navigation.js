import React, { Component } from 'react';

import {
  Platform,
  StyleSheet
} from 'react-native';

export default class Navigation extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.navigationBar}>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  navigationBar: {
    height: 24
  }
 })