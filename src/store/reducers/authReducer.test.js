import reducer from "./authReducer";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    };
  });

  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should store token upon login", () => {
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
          authData: { idToken: "testToken", localId: "testLocalId" },
        },
      })
    ).toEqual({ ...initialState, token: "testToken", userId: "testLocalId" });
  });
});
