// reducers/authReducer.js

const initialState = {
  token: null,
  isAuthenticated: false // Add isAuthenticated to the initial state
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_TOKEN':
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true // Set isAuthenticated to true when token is stored
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        isAuthenticated: false // Set isAuthenticated to false when logging out
      };
    default:
      return state;
  }
};

export default authReducer;
