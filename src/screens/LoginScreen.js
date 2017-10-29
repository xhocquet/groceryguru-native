import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { connect } from 'react-redux';

import Banner from '../components/Banner';
import * as API from '../api/Endpoints';
import * as SimpleAlert from '../utils/SimpleAlert';
import { GroceryGuruPrimary } from '../styles/Colors';
import * as actions from '../actions';
import StyleSheet from '../styles/HomeScreen';

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginInputEmail: undefined,
      loginInputPassword: undefined,
    }
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
        SimpleAlert.alert(res.message);
      }
    })
    .catch(function(response) {
      SimpleAlert.alert(response.message);
    })
  }

  render() {
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
  }
}

export default connect(
  state => ({
    currentUser: state.currentUser
  }),
  dispatch => ({
    userLoggedIn: currentUser => dispatch(actions.userLoggedIn(currentUser)),
  })
)(LoginScreen)