import { createSlice } from "@reduxjs/toolkit";

/*This is our authentication reducer. This lets us get, set, and remove our auth token in the browser's local storage which is then used for authentication.*/

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    user: null,
    auth_token: undefined,
  },
  reducers: {
    getAuth: (state) => {
      //Retrieve the current authentication token from the local storage.
      const auth_token = localStorage.getItem("auth_token") || null;
      if (auth_token) {
        //If it exists, update our state.
        try {
          state.auth_token = auth_token;
          state.user = JSON.parse(atob(auth_token.split(".")[1]));
          state.authenticated = true;
        } catch (exception) {
          //This probably means our token was there, but was not a valid token.
          state.authenticated = false;
        }
      }
    },
    setAuth: (state, action) => {
      //Overwrite the auth token value.
      const { payload: auth_token } = action;
      if (auth_token) {
        try {
          localStorage.setItem("auth_token", auth_token);
          state.auth_token = auth_token;
          state.user = JSON.parse(atob(auth_token.split(".")[1]));
          state.authenticated = true;
        } catch (exception) {
          state.authenticated = false;
        }
      }
    },
    logout: (state) => {
      //Set auth token to null
      localStorage.setItem("auth_token", null);
      state.authenticated = false;
      state.auth_token = undefined;
      state.user = null;
    },
  },
});

export const { getAuth, setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
