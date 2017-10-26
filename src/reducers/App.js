import { combineReducers } from 'redux'
import * as Constants from '../actions/Constants'

const appReducer = (state = {}, action) => {
  switch (action.type) {
    case Constants.USER_LOGGED_IN:
      return {
        ...state,
        currentUser: action.currentUser
      }
    case Constants.USER_LOGGED_OUT:
      return {
        ...state,
        currentUser: null
      }
    case Constants.RECEIPTS_LOADED:
      return {
        ...state,
        receipts: action.receipts
      }
    default:
      return state
  }
}

export default appReducer