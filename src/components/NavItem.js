import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class NavItem extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.navigationItem}>
        <Text>
          Page
        </Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  navigationItem: {
    width: '25%'
  }
 })