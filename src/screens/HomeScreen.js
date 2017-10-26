import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Banner from '../components/Banner';
import { ApiEndpoints } from '../../App';
import { GroceryGuruPrimary } from '../styles/Colors';
import * as actions from '../actions';

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

    fetch(ApiEndpoints.userSession, {
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
      return (
        <View style={styles.screen}>
          <Banner />
          <View
            onPress={this.onPressUpload}
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

export default connect(
  state => ({
    currentUser: state.currentUser
  }),
  dispatch => ({
    userLoggedIn: currentUser => dispatch(actions.userLoggedIn(currentUser)),
    userLoggedOut: () => dispatch(actions.userLoggedOut())
  })
)(HomeScreen)