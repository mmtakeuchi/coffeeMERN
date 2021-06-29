import {
  GET_CURRENT_USER,
  GET_USER_LOGOUT,
  GET_SIGN_IN_USER,
  GET_SESSION_ERRORS,
} from "../actions/sessionActions";

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: [],
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
      };
    case GET_SIGN_IN_USER:
      return {
        ...state,
        isAuthenticated: !!action.newUser,
        user: action.newUser,
      };
    case GET_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
      };
    case GET_SESSION_ERRORS:
      return {
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default sessionReducer;
