import { createSlice } from "@reduxjs/toolkit";

import { logout } from "../../authSlice";
import { getUserUploads, uploadUserFile } from "../../api";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    //Our default state.
    loading: true,
    uploads: [],
    selectedFile: null,
    uploading: false,
    errors: {
      upload: undefined,
    },
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUploads: (state, action) => {
      state.uploads = action.payload;
    },
    setUploading: (state, action) => {
      state.uploading = action.payload;
    },
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    uploadSucceeded: (state, action) => {
      state.uploads = action.payload;
      state.selectedFile = null;
      state.uploading = false;
    },
    uploadFailed: (state, action) => {
      state.errors.upload = action.payload;
      state.selectedFile = null;
      state.uploading = false;
    },
    resetErrors: (state) => {
      state.errors.upload = undefined;
    },
  },
});

export const {
  setLoading,
  setUploads,
  setUploading,
  setSelectedFile,
  uploadSucceeded,
  uploadFailed,
  resetErrors,
} = homeSlice.actions; //Export our actions for dispatching.

export const getUploads = () => (dispatch, getState) => {
  const state = getState();
  const { auth_token: token } = state.auth;
  getUserUploads(token)
    .then((response) => {
      dispatch(setUploads(response.data));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
        }
      } else {
        dispatch(uploadFailed("Something went very wrong."));
      }
    });
};

export const uploadFile = () => (dispatch, getState) => {
  dispatch(resetErrors());
  const state = getState();
  const { selectedFile } = state.home;
  if (selectedFile) {
    dispatch(setUploading(true));
    const { auth_token: token } = state.auth;
    const data = new FormData();
    data.append("file", selectedFile);
    setTimeout(() => {
      uploadUserFile(token, data)
        .then((response) => {
          dispatch(uploadSucceeded(response.data));
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              dispatch(logout());
            } else {
              dispatch(uploadFailed(error.response.data));
            }
          } else {
            dispatch(uploadFailed("Something went very wrong."));
          }
        });
    }, 2000); //Just for effect.
  } else {
    dispatch(uploadFailed("Please select a file to upload."));
  }
};

//Export our reducer.
export default homeSlice.reducer;
