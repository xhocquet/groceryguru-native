import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { AppRegistry } from 'react-native';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import { GroceryGuruNavigator } from './App';
import AppReducer from './src/reducers/App'

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

class GroceryGuruApp extends React.Component {
  store = createStore(AppReducer, applyMiddleware(...middleware));

  render() {
    return (
      <Provider store={this.store}>
        <GroceryGuruNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('GroceryGuruNative', () => GroceryGuruApp);
