import axios from "axios";
import jwt_decode from "jwt-decode";
import * as sessionApi from "../utils/sessionApi";

export const GET_CURRENT_USER = "GET_CURRENT_USER";
export const GET_SESSION_ERRORS = "GET_SESSION_ERRORS";
export const GET_USER_LOGOUT = "GET_USER_LOGOUT";
export const GET_SIGN_IN_USER = "GET_SIGN_IN_USER";

export const getCurrentuser = (currentUser) => ({
  type: GET_CURRENT_USER,
  currentUser,
});

export const getSigninUser = (newUser) => ({
  type: GET_SIGN_IN_USER,
  newUser,
});

export const logoutUser = () => ({
  type: GET_USER_LOGOUT,
});

export const getErrors = (errors) => ({
  type: GET_SESSION_ERRORS,
  errors,
});

export const signup = (userData) => (dispatch) =>
  axios
    .post("/api/users/register", userData)
    .then((res) => {
      console.log(res.data);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      sessionApi.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(getSigninUser(decoded));
    })
    .catch((err) => {
      dispatch(getErrors(err.response.data));
    });

export const login = (userData) => (dispatch) =>
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      console.log(res.data);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      sessionApi.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(getCurrentuser(decoded));
    })
    .catch((err) => {
      dispatch(getErrors(err.response.data));
    });

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  sessionApi.setAuthToken(false);
  dispatch(logoutUser());
};
