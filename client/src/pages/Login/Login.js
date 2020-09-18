import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./Login.module.css";
import logo from "../../NaturalHR-Logo.png";

import { Button, InputGroup, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import {
  setUsername,
  setPassword,
  submitLogin
} from './loginSlice';

import Errors from "../../components/Errors";

const Login = (props) => {
  const { dispatch, loading, errors, userInfo } = props;
  return (
    <div className={styles.loginForm}>
      <img className={styles.logo} src={logo} alt="Logo"></img>
      {loading ? <div><Spinner animation="border"/></div> : (
        <Form onSubmit={(e) => {
          e.preventDefault();
          dispatch(submitLogin());
        }}>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="user">
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Username/Email Address"
                aria-label="User"
                aria-describedby="user"
                value={userInfo.username}
                onChange={(e) => {dispatch(setUsername(e.target.value))}}
              />
            </InputGroup>
          </Form.Group>
          {errors.username.length > 0 && <Errors errors={errors.username}/>}
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="password">
                  <FontAwesomeIcon icon={faLock} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="password"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="password"
                onChange={(e) => {dispatch(setPassword(e.target.value))}}
              />
            </InputGroup>
          </Form.Group>
          {errors.password.length > 0 && <Errors errors={errors.password}/>}
          <div>
            <Button className={styles.loginButton} type="submit">Sign in</Button>
          </div>
          <Link to="/Register">Register a new account</Link>
          {errors.login.length > 0 && <Errors errors={errors.login}/>}
        </Form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state.login;
};
export default connect(mapStateToProps)(Login);