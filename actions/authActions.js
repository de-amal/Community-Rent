// actions/authActions.js

export const storeToken = (token) => {
    return {
      type: 'STORE_TOKEN',
      payload: token
    };
  };
  export const LOGOUT = 'LOGOUT';

// Action creators
export const logout = () => {
  return {
    type: LOGOUT,
  };
};