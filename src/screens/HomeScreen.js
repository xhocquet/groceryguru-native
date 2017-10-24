import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Banner from '../components/Banner';
import { CurrentUser, ApiEndpoints } from '../../App';
import { GroceryGuruPrimary } from '../styles/Colors';

let onPressUpload = function() {
  // Initiate camera upload
}

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginInputEmail: '',
      loginInputPassword: '',
      userEmail: '',
      userToken: ''
    }
  }

  static navigationOptions = {
    tabBarLabel: 'Home'
  }

  selectPasswordInput() {
    this._passwordInput.focus();
  }

  async submitLogin() {
    data = {
      user_login: {
        email: this.state.loginInputEmail,
        password: this.state.loginInputPassword
      }
    }

    fetch(ApiEndpoints.userSession, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-User-Email': 'xhocquet@gmail.com',
        'X-User-Token': 'MVxPS4xcUdZkNT88aFxX'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        userEmail: res.email,
        userToken: res.auth_token
      });
    })
    .catch(function(response) {
      console.error(response);
    })
  }

  render() {
    if (CurrentUser.email.length === 0) {
      this.props.navigation.navigate('DrawerOpen');
      return (
        <View style={styles.screen}>
        <Banner />
          <View style={styles.loginContainer}>
            <Text style={styles.loginHeader}>
              Login
            </Text>
            <TextInput
              style={styles.loginInput}
              onChangeText={(text) => this.setState({loginInputEmail: text})}
              value={this.state.loginInputEmail}
              keyboardType='email-address'
              selectionColor={GroceryGuruPrimary}
              placeholder="Email"
              returnKeyType='next'
              onSubmitEditing={this.selectPasswordInput.bind(this)}
            />
            <TextInput
              style={styles.loginInput}
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
      this.props.navigation.navigate('DrawerClose');
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
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
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
  },
  loginContainer: {
    margin: 8,
    padding: 8
  },
  loginHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GroceryGuruPrimary,
    textAlign: 'center'
  },
  loginInput: {
    marginTop: 24
  }
});