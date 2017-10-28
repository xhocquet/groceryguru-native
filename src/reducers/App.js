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
        currentUser: undefined,
        receiptsData: undefined,
        statsData: undefined
      }
    case Constants.RECEIPTS_DATA_LOADED:
      return {
        ...state,
        receiptsData: action.receiptsData
      }
    case Constants.STATS_DATA_LOADED:
      return {
        ...state,
        statsData: action.statsData
      }
    default:
      return state
  }
}

export default appReducer