import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./Register.module.css";
import logo from "../../NaturalHR-Logo.png";

import { Button, InputGroup, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import {
  setUsername,
  setPassword,
  setConfirmPassword,
  setEmail,
  submitRegistration
} from './registerSlice';

import Errors from "../../components/Errors";

const Register = (props) => {
  const { dispatch, loading, errors, userInfo, successful } = props;
  return (
    <div className={styles.registerForm}>
      <img className={styles.logo} src={logo} alt="Logo"></img>
      {loading ? <div><Spinner animation="border"/></div> : (
        <Form onSubmit={(e) => {
          e.preventDefault();
          dispatch(submitRegistration());
        }}>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="username">
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Username"
                aria-label="Username"
                aria-describedby="username"
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
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="password2">
                  <FontAwesomeIcon icon={faLock} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                aria-describedby="password2"
                onChange={(e) => {dispatch(setConfirmPassword(e.target.value))}}
              />
            </InputGroup>
          </Form.Group>
          {errors.confirmPassword.length > 0 && <Errors errors={errors.confirmPassword}/>}
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="email">
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Email Address"
                aria-label="Email Address"
                aria-describedby="email"
                value={userInfo.email}
                onChange={(e) => {dispatch(setEmail(e.target.value))}}
              />
            </InputGroup>
          </Form.Group>
          {errors.email.length > 0 && <Errors errors={errors.email}/>}
          <div>
            <Button className={styles.registerButton} type="submit">Register</Button>
          </div>
          <Link to="/Login">Return to login</Link>
          {errors.register.length > 0 && <Errors errors={errors.register}/>}
          {successful && <div><span style={{color:"green"}}>Registration successful! Return to login page.</span></div>}
        </Form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state.register;
};
export default connect(mapStateToProps)(Register);