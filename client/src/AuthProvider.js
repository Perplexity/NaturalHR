import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAuth } from "./authSlice";

//AuthProvider will retrieve our auth token on every page, as it is a parent component for our app.

const AuthProvider = (props) => {
  const { dispatch, children } = props;
  useEffect(() => {
    dispatch(getAuth());
  }, []);
  return <>{children}</>;
};

const mapStateToProps = (state) => {
  return state.auth;
};
export default connect(mapStateToProps)(AuthProvider);
