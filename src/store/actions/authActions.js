import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (authData) => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: { authData: authData },
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  payload: { error: error },
});

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    const url = isSignup
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3SpwNDuEbiGKhW0u72TwS89jMfsiJIRo"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3SpwNDuEbiGKhW0u72TwS89jMfsiJIRo";

    axios
      .post(url, authData)
      .then((res) => {
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem(
          "expirationDate",
          new Date(new Date().getTime() + res.data.expiresIn * 1000)
        );
        localStorage.setItem("userId", res.data.localId);

        dispatch(authSuccess(res.data));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  payload: { path: path },
});

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
      return;
    }
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date()) {
      dispatch(logout());
      return;
    }
    dispatch(
      authSuccess({ idToken: token, localId: localStorage.getItem("userId") })
    );
    dispatch(
      checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
    );
  };
};

// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
// API_KEY = "AIzaSyD3SpwNDuEbiGKhW0u72TwS89jMfsiJIRo"
