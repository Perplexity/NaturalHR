import { createSlice } from "@reduxjs/toolkit";

import { register } from "../../api";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    //Our default state.
    loading: false,
    userInfo: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    errors: {
      username: [],
      password: [],
      confirmPassword: [],
      email: [],
      register: [],
    },
    successful: false,
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
    setConfirmPassword: (state, action) => {
      //Fired when the `confirm password` field is changed.
      state.userInfo.confirmPassword = action.payload;
    },
    setEmail: (state, action) => {
      //Fired when the `email` field is changed.
      state.userInfo.email = action.payload;
    },
    addUsernameError: (state, action) => {
      //Adds error to username errors array.
      state.errors.username.push(action.payload);
    },
    addPasswordError: (state, action) => {
      //Adds error to password errors array.
      state.errors.password.push(action.payload);
    },
    addConfirmPasswordError: (state, action) => {
      //Adds error to confirm password errors array.
      state.errors.confirmPassword.push(action.payload);
    },
    addEmailError: (state, action) => {
      //Adds error to email errors array.
      state.errors.email.push(action.payload);
    },
    resetUserInfo: (state) => {
      //Resets user input.
      state.userInfo = {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
      };
    },
    resetErrors: (state) => {
      //Resets errors.
      state.errors = {
        username: [],
        password: [],
        confirmPassword: [],
        email: [],
        register: [],
      };
    },
    registrationFailed: (state, action) => {
      //Display login errors, but keep username so user does not have to re-enter.
      state.errors.register.push(action.payload);
    },
    registrationSucceeded: (state) => {
      state.successful = true;
    }
  },
});

export const {
  setLoading,
  setUsername,
  setPassword,
  setConfirmPassword,
  setEmail,
  addUsernameError,
  addPasswordError,
  addConfirmPasswordError,
  addEmailError,
  resetUserInfo,
  resetErrors,
  registrationFailed,
  registrationSucceeded
} = registerSlice.actions; //Export our actions for dispatching.

export const submitRegistration = () => (dispatch, getState) => {
  //Validate user input, then submit to API, then handle response.
  let state = getState();
  dispatch(resetErrors());
  let { username, password, confirmPassword, email } = state.register.userInfo;
  if (username.length === 0) {
    dispatch(addUsernameError("Must enter a valid username."));
  }
  if (password.length === 0) {
    dispatch(addPasswordError("Must enter a valid password."));
  }
  if (confirmPassword !== password) {
    dispatch(addConfirmPasswordError("Passwords must match."));
  }
  if (email.length === 0 || !email.match(/^\S+@\S+$/)) {
    dispatch(addEmailError("Must enter a valid email address."));
  }
  state = getState();
  const { errors } = state.register;
  if (errors.username.length === 0 && errors.password.length === 0 && errors.confirmPassword.length === 0 && errors.email.length === 0) {
    //Validation succeeded, now we submit registration.
    dispatch(setLoading(true));
    setTimeout(() => {
      register(username, password, confirmPassword, email)
        .then(() => {
          dispatch(resetUserInfo());
          dispatch(resetErrors());
          dispatch(registrationSucceeded());
        })
        .catch((error) => {
          if (error.response) {
            dispatch(registrationFailed(error.response.data));
          } else {
            dispatch(registrationFailed("Fatal error."));
          }
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }, 2000); //Just for effect. Not actually practical.
  }
};

//Export our reducer.
export default registerSlice.reducer;
