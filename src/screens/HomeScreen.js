import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Banner from '../components/Banner';
import { CurrentUser } from '../../App';
import { GroceryGuruPrimary } from '../styles/Colors';

let onPressUpload = function() {
  // Initiate camera upload
}

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginEmail: '',
      loginPass: ''
    }
  }

  static navigationOptions = {
    tabBarLabel: 'Home'
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
              style={[styles.loginInput, styles.emailInput]}
              onChangeText={(text) => this.setState({loginEmail: text})}
              value={this.state.loginEmail}
              autoFocus={true}
              keyboardType='email-address'
              selectionColor={GroceryGuruPrimary}
            />
            <TextInput
              style={[styles.loginInput, styles.passwordInput]}
              onChangeText={(text) => this.setState({loginPass: text})}
              secureTextEntry={true}
              selectionColor={GroceryGuruPrimary}
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
    color: 'black',
    textAlign: 'center'
  }
});