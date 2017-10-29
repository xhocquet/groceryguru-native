import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import * as actions from '../actions';
import { GroceryGuruBlue, GroceryGuruWhite } from '../styles/Colors';

export class Banner extends React.Component {
  onIconClicked() {
    this.props.userLoggedOut();
  }

  render() {
    return (
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          Grocery Guru
        </Text>
        <Icon onPress={this.onIconClicked.bind(this)} name='account-box' style={styles.userIcon} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: GroceryGuruBlue,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 3,
  },
  bannerText: {
    fontSize: 42,
    color: GroceryGuruWhite,
    fontWeight: 'bold',
  },
  userIcon: {
    fontSize: 48,
    color: GroceryGuruWhite,
    lineHeight: 52
  }
});


export default connect(
  state => ({
    currentUser: state.currentUser,
  }),
  dispatch => ({
    userLoggedOut: () => dispatch(actions.userLoggedOut()),
  })
)(Banner)