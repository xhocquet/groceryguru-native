import * as Constants from './Constants';

export const userLoggedIn = (currentUser: currentUser): Action => {
  return {
    type: Constants.USER_LOGGED_IN,
    currentUser
  }
}

export const userLoggedOut = (): Action => {
  return {
    type: Constants.USER_LOGGED_OUT
  }
}

export const receiptsDataLoaded = (receiptsData: receiptsData): Action => {
  return {
    type: Constants.RECEIPTS_DATA_LOADED,
    receiptsData
  }
}

export const statsDataLoaded = (statsData: statsData): Action => {
  return {
    type: Constants.STATS_DATA_LOADED,
    statsData
  }
}