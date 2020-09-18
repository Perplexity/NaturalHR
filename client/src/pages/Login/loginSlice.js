import { createSlice } from "@reduxjs/toolkit";

import { setAuth } from "../../authSlice";
import { login } from "../../api";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    //Our default state.
    loading: false,
    userInfo: {
      username: "",
      password: "",
    },
    errors: {
      username: [],
      password: [],
      login: [],
    },
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUsername: (state, action) => {
      //Fired when the `username` field is changed.
      state.userInfo.username = action.payload;
    },
    setPassword: (state, action) => {
      //Fired when the `password` field is changed.
      state.userInfo.password = action.payload;
    },
    addUsernameError: (state, action) => {
      //Adds error to username errors array.
      state.errors.username.push(action.payload);
    },
    addPasswordError: (state, action) => {
      //Adds error to password errors array.
      state.errors.password.push(action.payload);
    },
    resetUserInfo: (state) => {
      //Resets user input.
      state.userInfo = {
        username: "",
        password: "",
      };
    },
    resetErrors: (state) => {
      //Resets errors.
      state.errors = {
        username: [],
        password: [],
        login: [],
      };
    },
    loginFailed: (state, action) => {
      //Display login errors, but keep username so user does not have to re-enter.
      state.userInfo.password = "";
      state.errors.login.push(action.payload);
    },
  },
});

export const {
  setLoading,
  setUsername,
  setPassword,
  addUsernameError,
  addPasswordError,
  resetUserInfo,
  resetErrors,
  loginFailed,
} = loginSlice.actions; //Export our actions for dispatching.

export const submitLogin = () => (dispatch, getState) => {
    //Validate user input, then submit to API, then handle response.
  let state = getState();
  dispatch(resetErrors());
  let {username, password} = state.login.userInfo;
  if (username.length === 0) {
    dispatch(addUsernameError("Must enter a valid username."));
  }
  if (password.length === 0) {
    dispatch(addPasswordError("Must enter a valid password."));
  }
  state = getState();
  const {errors} = state.login;
  if (
    errors.username.length === 0 &&
    errors.password.length === 0
  ) {
    //Validation succeeded, now we submit user details.
    dispatch(setLoading(true));
    setTimeout(() => {
      login(username, password).then((response) => {
        dispatch(resetUserInfo());
        dispatch(resetErrors());
        dispatch(setAuth(response.data));
      }).catch((error) => {
        if(error.response) {
          dispatch(loginFailed(error.response.data));
        } else {
          dispatch(loginFailed("Fatal error."));
        }
      }).finally(() => {
        dispatch(setLoading(false));
      });
    }, 2000); //Just for effect. Not actually practical.
  }
};

//Export our reducer.
export default loginSlice.reducer;
