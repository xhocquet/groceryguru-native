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