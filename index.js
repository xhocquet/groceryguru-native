import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import { GroceryGuruNavigator } from './App';
import AppReducer from './src/reducers/App'

// Storage engine (react-native async)
const engine = createEngine('GroceryGuruApp');

const reducer = storage.reducer(AppReducer);

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
  middleware.push(storage.createMiddleware(engine));

}
const store = createStore(reducer, applyMiddleware(...middleware));

const load = storage.createLoader(engine);
load(store);

class GroceryGuruApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <GroceryGuruNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('GroceryGuruNative', () => GroceryGuruApp);
