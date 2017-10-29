import React, { Component } from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

const ImagePicker = require('react-native-image-picker');

import Banner from '../components/Banner';
import LoginScreen from './LoginScreen';
import * as API from '../api/Endpoints';
import { GroceryGuruPrimary } from '../styles/Colors';
import * as actions from '../actions';
import StyleSheet from '../styles/HomeScreen';

export class HomeScreen extends React.Component {
  static navigationOptions = { tabBarLabel: 'Home' }

  constructor(props) {
    super(props);

    this.state = {
      receiptImageSource: undefined,
      receiptImageUri: undefined,
      imageHeight: undefined,
      imageWidth: undefined,
      dimensions: undefined,
    }
  }

  onLayout(event) {
    let { width, height } = event.nativeEvent.layout;
    this.setState({dimensions: { width, height }});
  }

  onPressUpload() {
    var options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let uriSource = response.uri;
        let source = 'data:image/jpeg;base64,' + response.data;

        this.setState({
          receiptImageSource: source,
          receiptImageUri: uriSource,
          imageHeight: response.height,
          imageWidth: response.width,
        });
      }
    });
  }

  userLoggedOut() {
    this.props.userLoggedOut();
  }



  render() {
    if (this.props.currentUser == undefined) {
      return (
        <LoginScreen />
      );
    } else {
      if (this.state.receiptImageSource) {
        let { receiptImageSource, imageHeight, imageWidth, dimensions } = this.state;
         return (
          <View style={StyleSheet.screen}>
            <Image
              style={StyleSheet.photoContainer}
              source={{uri: receiptImageSource}}
              resizeMode="contain"
              onLayout={this.onLayout.bind(this)}
            />
          </View>
        );
      } else {
        return (
          <View style={StyleSheet.screen}>
            <Banner />
            <View style={StyleSheet.content}>
              <TouchableOpacity onPress={this.onPressUpload.bind(this)} style={StyleSheet.uploadButton} >
                <Text style={StyleSheet.uploadButtonText}>
                  Upload receipt
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
  }
}

export default connect(
  state => ({
    currentUser: state.currentUser
  }),
  dispatch => ({
    userLoggedOut: () => dispatch(actions.userLoggedOut())
  })
)(HomeScreen)