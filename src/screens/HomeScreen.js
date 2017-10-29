import React, { Component } from 'react';
import { Text, View, Alert, TouchableOpacity, Image, PanResponder, Animated } from 'react-native';
import { connect } from 'react-redux';

const ImagePicker = require('react-native-image-picker');
import Icon from 'react-native-vector-icons/MaterialIcons';

import Banner from '../components/Banner';
import LoginScreen from './LoginScreen';
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
      cropPoints: {
        a: {
          pan: new Animated.ValueXY()
        },
        b: {
          pan: new Animated.ValueXY()
        },
        c: {
          pan: new Animated.ValueXY()
        },
        d: {
          pan: new Animated.ValueXY()
        }
      }
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.cropPoints.a.pan.setOffset({x: this.state.cropPoints.a.pan.x._value, y: this.state.cropPoints.a.pan.y._value});
        this.state.cropPoints.a.pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null, {dx: this.state.cropPoints.a.pan.x, dy: this.state.cropPoints.a.pan.y},
      ]),
      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.cropPoints.a.pan.flattenOffset();
      }
    })
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
      let uriSource = response.uri;
      let source = 'data:image/jpeg;base64,' + response.data;

      this.setState({
        receiptImageSource: source,
        receiptImageUri: uriSource,
        imageHeight: response.height,
        imageWidth: response.width,
      });
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
        let { pan } = this.state.cropPoints.a;
        let [translateX, translateY] = [pan.x, pan.y];
        let imageStyle = {transform: [{translateX}, {translateY}]};
        return (
          <View style={StyleSheet.screen}>
            <Image
              style={StyleSheet.photoContainer}
              source={{uri: receiptImageSource}}
              resizeMode="contain"
              onLayout={this.onLayout.bind(this)}
            />
            <Animated.View {...this._panResponder.panHandlers} style={imageStyle}>
              <Icon name='square' style={styles.refreshIcon} style={StyleSheet.cropIcon} />
            </Animated.View>
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