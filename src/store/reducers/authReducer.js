import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

const setAuthRedirectPath = (state, { path }) => {
  return updateObject(state, { authRedirectPath: path });
};

const authStart = (state, payload) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, { authData }) => {
  return updateObject(state, {
    token: authData.idToken,
    userId: authData.localId,
    loading: false,
    error: null,
  });
};

const authFail = (state, { error }) => {
  return updateObject(state, { error: error, loading: false });
};

const authLogout = (state, payload) => {
  return updateObject(state, { token: null, userId: null });
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.AUTH_START:
      return authStart(state, payload);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, payload);

    case actionTypes.AUTH_FAIL:
      return authFail(state, payload);

    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, payload);

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, payload);

    default:
      return state;
  }
};

export default reducer;
