import React, { Component } from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity  } from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Banner from '../components/Banner';
import * as API from '../api/Endpoints';
import { GroceryGuruPrimary } from '../styles/Colors';
import * as actions from '../actions';
import StyleSheet from '../styles/HomeScreen';

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginInputEmail: '',
      loginInputPassword: ''
    }
  }

  onPressUpload() {
    return;
  }

  userLoggedOut() {
    this.props.userLoggedOut();
  }

  static navigationOptions = {
    tabBarLabel: 'Home'
  }

  selectPasswordInput() {
    this._passwordInput.focus();
  }

  async submitLogin() {
    loginData = {
      user_login: {
        email: this.state.loginInputEmail,
        password: this.state.loginInputPassword
      }
    }

    fetch(API.userSession, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(loginData)
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        this.props.userLoggedIn(res);
      } else {
        Alert.alert(
          res.message,
          '',
          [{text: 'OK', onPress: () => true }],
          { cancelable: false }
        )
      }
    })
    .catch(function(response) {
      Alert.alert(
        response.message,
        '',
        [{text: 'OK', onPress: () => true }],
        { cancelable: false }
      )
    })
  }

  render() {
    if (this.props.currentUser == undefined) {
      return (
        <View style={StyleSheet.screen}>
        <Banner />
          <View style={StyleSheet.loginContainer}>
            <Text style={StyleSheet.loginHeader}>
              Login
            </Text>
            <TextInput
              style={StyleSheet.loginInput}
              onChangeText={(text) => this.setState({loginInputEmail: text})}
              value={this.state.loginInputEmail}
              keyboardType='email-address'
              selectionColor={GroceryGuruPrimary}
              placeholder="Email"
              returnKeyType='next'
              onSubmitEditing={this.selectPasswordInput.bind(this)}
            />
            <TextInput
              style={StyleSheet.loginInput}
              onChangeText={(text) => this.setState({loginInputPassword: text})}
              secureTextEntry={true}
              selectionColor={GroceryGuruPrimary}
              placeholder="Password"
              ref={(c) => this._passwordInput = c}
              onSubmitEditing={this.submitLogin.bind(this)}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={StyleSheet.screen}>
          <Banner />
          <View
            onPress={this.onPressUpload}
            style={StyleSheet.uploadButton} >
            <Text style={StyleSheet.uploadButtonText}>
              Upload receipt
            </Text>
          </View>
          <View style={StyleSheet.settingsButton} >
            <Text style={StyleSheet.settingsButtonText} >
              Settings
            </Text>
            <Icon name='settings' style={StyleSheet.settingsIcon} />
          </View>
          <TouchableOpacity  style={StyleSheet.logoutButton} onPress={this.userLoggedOut.bind(this)}>
            <Text style={StyleSheet.logoutButtonText}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

export default connect(
  state => ({
    currentUser: state.currentUser
  }),
  dispatch => ({
    userLoggedIn: currentUser => dispatch(actions.userLoggedIn(currentUser)),
    userLoggedOut: () => dispatch(actions.userLoggedOut())
  })
)(HomeScreen)